const db = require("../db")

const addProductToEvents = (product_id, events) => {
  events.forEach(event => {
    db.query("INSERT INTO products_events VALUES ($1,$2)", [product_id, event])
  })
}

const getSellersEvents = async (seller_id) => {
  const query = "SELECT *, reko_areas.name, events.id FROM events INNER JOIN markets ON markets.id = events.market_id INNER JOIN reko_markets ON markets.id = reko_markets.market_id INNER JOIN reko_areas ON reko_markets.areas_id=reko_areas.id INNER JOIN sellers_reko ON sellers_reko.reko_area_id=reko_areas.id INNER JOIN sellers ON sellers.id = sellers_reko.seller_id WHERE sellers.id=$1"
  const sellerEvents = await  db.query(query,[seller_id])
  return(sellerEvents)
}

const getEventsSellerHasProducts = async (seller_id) => {
  const query = "SELECT DISTINCT events.id, events.start, events.endtime from products INNER JOIN products_events ON products.id = products_events.id_product INNER JOIN events ON products_events.id_event = events.id WHERE products.sellers_id=$1"
  const sellerEvents = await  db.query(query,[seller_id])
  return(sellerEvents)
}

module.exports = { addProductToEvents, getSellersEvents, getEventsSellerHasProducts }

