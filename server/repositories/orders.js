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

const getSellersEventOrders = async (sellers_id, event_id) => {
  const query = "SELECT  users.firstname, users.lastname, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id WHERE orders.event_id=$1 AND products.sellers_id=$2 GROUP BY (users.firstname, users.lastname)"
  const orders = await db.query(query, [event_id, sellers_id])
  return(orders)
   
}

const getBuyersEventOrders = async (buyers_id, event_id) => {
  const query = "SELECT  users.firstname, users.lastname, json_agg(json_build_object('quantity', batches.quantity, 'product_name', products.name, 'size', sizes.unit, 'price', sizes.unit*products.unit_price)) AS orders from orders INNER JOIN batches ON orders.id = batches.order_id INNER JOIN sizes ON sizes.id = batches.sizes_id INNER JOIN products ON products.id = sizes.product_id INNER JOIN buyers ON buyers.id = orders.buyers_id INNER JOIN users ON users.id = buyers.id WHERE orders.event_id=$1 AND buyers.id=$2 GROUP BY (users.firstname, users.lastname)"
  const orders = await db.query(query, [event_id, buyers_id])
  return(orders)
}


module.exports = { addOrder, addBatch, getSellersEventOrders, getBuyersEventOrders}