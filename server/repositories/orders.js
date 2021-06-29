const db = require("../db")
const format = require("pg-format")

const addOrder = async (buyer_id, event_id) => {
  const current_date = new Date()
  const query = "INSERT INTO orders VALUES(DEFAULT, $1, $2, $3) Returning id"
  const order_id = await db.query(query, [buyer_id, current_date ,event_id])
  return(order_id[0].id)
}

const addBatches = async (batches) => {
  const query = format("INSERT INTO batches (order_id, sizes_id, quantity, removed) VALUES %L", batches)
  await db.query(query, [])
}

const getSellersOrders = async (sellers_id) => {
  const query = "SELECT  event_id, event_endtime, event_start, event_address, reko_name, json_agg(json_build_object('order_id', order_id, 'users_firstname', users_firstname,'user_id', users_id, 'users_lastname', users_lastname, 'price', price, 'user_orders', orders)) AS events_orders FROM (SELECT orders.id, users.firstname AS users_firstname, users.id AS users_id, users.lastname AS users_lastname, (SELECT COALESCE(SUM(sizes.unit*products.unit_price),0) FROM products INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN batches ON batches.sizes_id = sizes.id INNER JOIN products_events ON products_events.id_product = products.id WHERE batches.removed=false AND products.sellers_id=$1 AND products_events.id_event=e.id) AS price, orders.id AS order_id, e.id AS event_id, e.endtime AS event_endtime, markets.address AS event_address, e.start AS event_start, reko_areas.name AS reko_name, json_agg(json_build_object('size_id', s.id,'quantity', b.quantity, 'product_name', p.name, 'product_id', p.id, 'product_image_url',p.image_url, 'size', s.unit, 'price', s.unit*p.unit_price, 'type', p.type, 'unit_price', p.unit_price, 'removed', b.removed)) AS orders from orders INNER JOIN batches AS b ON orders.id = b.order_id INNER JOIN sizes AS s ON s.id = b.sizes_id INNER JOIN products AS p ON p.id = s.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id INNER JOIN events AS e ON e.id = orders.event_id INNER JOIN markets ON markets.id = e.market_id INNER JOIN reko_markets ON reko_markets.market_id = markets.id INNER JOIN reko_areas ON reko_areas.id = reko_markets.areas_id WHERE p.sellers_id=$1 GROUP BY (users.firstname, users.lastname, users.id, e.id, e.endtime, orders.id, e.start, reko_areas.name, markets.address)) AS res GROUP BY (event_id, event_endtime, event_start,reko_name, event_address)"
  const orders = await db.query(query, [sellers_id])
  return(orders)
}

const getSellersOrder = async (sellers_id, order_id) => {
  const query = "SELECT orders.id, orders.event_id, json_agg(json_build_object('quantity', batches.quantity, 'name', products.name, 'price', products.unit_price*sizes.unit)) AS batches from orders INNER JOIN batches ON batches.order_id = orders.id INNER JOIN sizes ON batches.sizes_id = sizes.id INNER JOIN products ON sizes.product_id = products.id WHERE orders.id=$1 AND products.sellers_id=$2 GROUP BY(orders.id, orders.event_id)"
  const orders = await db.query(query, [order_id, sellers_id])
  console.log("ORDER", orders[0])
  return(orders[0])
   
}

const getSellersOrderBySize = async (size_id, order_id) => {
  const query = "SELECT orders.id, orders.event_id, json_agg(json_build_object('quantity', batches.quantity, 'name', products.name, 'price', products.unit_price*sizes.unit)) AS batches from orders INNER JOIN batches ON batches.order_id = orders.id INNER JOIN sizes ON batches.sizes_id = sizes.id INNER JOIN products ON sizes.product_id = products.id WHERE orders.id=$1 AND sizes.id=$2 GROUP BY(orders.id, orders.event_id)"
  const orders = await db.query(query, [order_id, size_id])
  return(orders[0])
   
}

const getBuyersOrders = async (buyers_id) => {
  const query = "SELECT event_id, event_endtime, price, orders FROM (SELECT (SELECT COALESCE(SUM(sizes.unit*products.unit_price),0) FROM products INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN batches ON batches.sizes_id = sizes.id INNER JOIN products_events ON products_events.id_product = products.id WHERE batches.removed=false AND products.sellers_id=$1 AND products_events.id_event=e.id) AS price , e.id AS event_id, e.endtime AS event_endtime, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'product_id', products.id, 'product_image_url', products.image_url, 'size', sizes.unit, 'price', sizes.unit*products.unit_price, 'type', products.type, 'unit_price', products.unit_price, 'removed', batches.removed)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id INNER JOIN events AS e ON e.id = orders.event_id WHERE buyers.id=$1 GROUP by (e.id, e.endtime)) AS res"
  const orders = await db.query(query, [buyers_id])
  return(orders)
}

const removeSellersOrder = async (seller_id, order_id) => {
  await db.query("UPDATE batches SET removed=true FROM sizes, products WHERE batches.order_id=$1 AND batches.sizes_id = sizes.id AND sizes.product_id = products.id AND products.sellers_id=$2;", [order_id, seller_id])
}

const removeProductFromSellersOrder = async (order_id, size_id) => {
  await db.query("UPDATE batches SET removed=true FROM sizes, products WHERE batches.order_id=$1 AND batches.sizes_id = $2", [order_id, size_id])
}

module.exports = { addOrder, addBatches, getSellersOrders, getBuyersOrders, removeSellersOrder, removeProductFromSellersOrder, getSellersOrder, getSellersOrderBySize}
