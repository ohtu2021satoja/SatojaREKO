const db = require("../db")

const addOrder = async (buyer_id, event_id) => {
  const query = "INSERT INTO orders VALUES(DEFAULT, $1, DEFAULT, $2) Returning id"
  const order_id = await db.query(query, [buyer_id, event_id])
  return(order_id[0].id)
}

const addBatch = async (order_id, size_id, quantity) => {
  const query = "INSERT INTO batches VALUES($1, $2, $3)"
  await db.query(query, [order_id, size_id, quantity])
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


module.exports = { addOrder, addBatch, getSellersOrders, getBuyersOrders}
