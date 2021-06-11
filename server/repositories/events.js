 
const db = require("../db")
const format = require("pg-format")

const addProductToEvents = (product_id, events) => {
  const values = events.map(event => [product_id, event])
  const query = format("INSERT INTO products_events (id_product,id_event) VALUES %L", values)
  db.query(query, [])
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

const getMarketEvents = async (market_id) => {
  const query = "SELECT * FROM events WHERE market_id=$1 ORDER BY start"
  const marketEvents = await db.query(query,[market_id])
  return(marketEvents)
}

const getEventsProductFeed = async () => {
  const newestProductsQuery = "SELECT market_id, event_id, product_count, json_agg(json_build_object('product_id', product_id, 'product_name', product_name, 'image_url', image_url)) AS products FROM (SELECT m.id market_id, e.id event_id, p.id product_id, p.name product_name, p.image_url, DENSE_RANK () OVER (PARTITION BY m.id ORDER BY e.start) event_rank, ROW_NUMBER() OVER (PARTITION BY e.id ORDER BY p.created_at DESC) product_rank, counts.product_count FROM markets m JOIN events e ON m.id = e.market_id JOIN products_events pe ON e.id = pe.id_event JOIN products p ON pe.id_product = p.id JOIN (SELECT e.id event_id, COUNT(p.*) product_count FROM events e JOIN products_events pe ON e.id = pe.id_event JOIN products p ON pe.id_product = p.id GROUP BY e.id) counts ON e.id = counts.event_id WHERE e.start <= now()) new_products WHERE new_products.event_rank = 1 AND new_products.product_rank <= 4 GROUP BY event_id, market_id, product_count;"
  const eventsProductFeed= await db.query(newestProductsQuery)

  return eventsProductFeed
}

module.exports = { addProductToEvents, getSellersEvents, getMarketEvents, getEventsProductFeed, getEventsSellerHasProducts  }