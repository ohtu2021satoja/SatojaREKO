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
  const query = "SELECT  event_id, event_endtime, json_agg(json_build_object('order_id', order_id, 'users_firstname', users_firstname, 'users_lastname', users_lastname, 'price', price, 'user_orders', orders)) AS events_orders FROM (SELECT orders.id, users.firstname AS users_firstname, users.lastname AS users_lastname, SUM(sizes.unit*products.unit_price) AS price, orders.id AS order_id, events.id AS event_id, events.endtime AS event_endtime, json_agg(json_build_object('sizes_id', sizes.id,'quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price, 'type', products.type, 'unit_price', products.unit_price, 'removed', batches.removed)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id INNER JOIN events ON events.id = orders.event_id WHERE products.sellers_id=$1 GROUP BY (users.firstname, users.lastname, events.id, events.endtime, orders.id)) AS res GROUP BY (event_id, event_endtime)"
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
  const query = "SELECT event_id, event_endtime, price, orders FROM (SELECT SUM(sizes.unit*products.unit_price) AS price , events.id AS event_id, events.endtime AS event_endtime, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price, 'type', products.type, 'unit_price', products.unit_price, 'removed', batches.removed)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id INNER JOIN events ON events.id = orders.event_id WHERE buyers.id=$1 GROUP by (events.id, events.endtime)) AS res"
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
