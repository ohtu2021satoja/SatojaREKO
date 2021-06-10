const db = require("../db")
const format = require("pg-format")

const addOrder = async (buyer_id, event_id) => {
  const query = "INSERT INTO orders VALUES(DEFAULT, $1, DEFAULT, $2) Returning id"
  const order_id = await db.query(query, [buyer_id, event_id])
  return(order_id[0].id)
}

const addBatches = async (batches) => {
  const query = format("INSERT INTO batches (order_id, sizes_id, quantity, removed) VALUES %L", batches)
  await db.query(query, [])
}

const getSellersOrders = async (sellers_id) => {
  const query = "SELECT  event_id, json_agg(json_build_object('users_firstname', users_firstname, 'users_lastname', users_lastname, 'price', price, 'user_orders', orders)) AS events_orders FROM (SELECT users.firstname AS users_firstname, users.lastname AS users_lastname, SUM(sizes.unit*products.unit_price) AS price, orders.id AS order_id, orders.event_id AS event_id, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price, 'type', products.type, 'unit_price', products.unit_price)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id WHERE products.sellers_id=$1 GROUP BY (users.firstname, users.lastname, event_id, orders.id)) AS res GROUP BY (event_id)"
  const orders = await db.query(query, [sellers_id])
  return(orders)
   
}

const getBuyersOrders = async (buyers_id) => {
  const query = "SELECT event_id, price, orders FROM (SELECT SUM(sizes.unit*products.unit_price) AS price , orders.event_id AS event_id, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price, 'type', products.type, 'unit_price', products.unit_price)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id WHERE buyers.id=$1 GROUP by (event_id)) AS res"
  const orders = await db.query(query, [buyers_id])
  return(orders)
}

const removeSellersOrder = async (seller_id, order_id) => {
  await db.query("UPDATE batches SET removed=true FROM sizes, products WHERE batches.order_id=$1 AND batches.sizes_id = sizes.id AND sizes.product_id = products.id AND products.sellers_id=$2;", [order_id, seller_id])
}


module.exports = { addOrder, addBatches, getSellersOrders, getBuyersOrders, removeSellersOrder}
