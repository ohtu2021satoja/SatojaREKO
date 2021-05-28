const db = require("../db")
const addProductToEvents = (product_id, events) => {
  events.forEach(event => {
    db.query("INSERT INTO products_events VALUES ($1,$2)", [product_id, event])
  })
}


module.exports = { addProductToEvents }