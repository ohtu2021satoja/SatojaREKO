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

module.exports = { addOrder, addBatch}