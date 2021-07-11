const db = require("../db")
const format = require("pg-format")

const addProductToEvents = (product_id, events) => {
  const values = events.map((event) => [product_id, event])
  const query = format(
    "INSERT INTO products_events (id_product,id_event) VALUES %L",
    values
  )
  db.query(query, [])
}

const removeProductFromEvents = (product_id, events) => {
  db.query(
    "DELETE from products_events WHERE id_product=$1 AND id_event=ANY($2::int[])",
    [product_id, events]
  )
}

const getEvents = () => {
  const events = db.query(
    "SELECT *, markets.address, markets.city, events.id from events INNER JOIN markets on events.market_id = markets.id"
  )
  return events
}

const getSellersEvents = async (seller_id) => {
  const query =
    "SELECT *, reko_areas.name, events.id, markets.address, markets.city FROM events INNER JOIN markets ON markets.id = events.market_id INNER JOIN reko_markets ON markets.id = reko_markets.market_id INNER JOIN reko_areas ON reko_markets.areas_id = reko_areas.id INNER JOIN sellers_reko ON sellers_reko.reko_area_id = reko_areas.id INNER JOIN sellers ON sellers.id = sellers_reko.seller_id WHERE sellers.id = $1 AND events.start >= NOW() ORDER BY events.start;"
  const sellerEvents = await db.query(query, [seller_id])
  return sellerEvents
}

const getEventsSellerHasProducts = async (seller_id) => {
  const query =
    "SELECT events.id AS event_id, events.start, events.endtime, events.market_id, (SELECT json_build_object('id', markets.id, 'address', markets.address, 'location', markets.location, 'city', markets.city, 'reko_name', reko_areas.name) from markets INNER JOIN reko_markets ON reko_markets.market_id=markets.id INNER JOIN reko_areas ON reko_areas.id = reko_markets.areas_id  where markets.id=events.market_id) AS market from products INNER JOIN products_events ON products.id = products_events.id_product INNER JOIN events ON products_events.id_event = events.id WHERE products.sellers_id=$1 AND products.removed=false GROUP BY (events.id, events.start, events.endtime)"
  const sellerEvents = await db.query(query, [seller_id])
  return sellerEvents
}

const getMarketEvents = async (market_id) => {
  const query = "SELECT * FROM events WHERE market_id=$1 ORDER BY start"
  const marketEvents = await db.query(query, [market_id])
  return marketEvents
}

const getMarketEvent = async (market_id, event_id) => {
  const query =
    "SELECT * FROM events WHERE market_id=$1 AND id=$2 ORDER BY start"
  const marketEvents = await db.query(query, [market_id, event_id])
  return marketEvents[0]
}

const getEventsProductFeed = async () => {
  const newestProductsQuery =
    "SELECT market_id, event_id, product_count, json_agg(json_build_object('product_id', product_id, 'product_name', product_name, 'image_url', image_url)) AS products FROM (SELECT m.id market_id, e.id event_id, p.id product_id, p.name product_name, p.image_url, DENSE_RANK () OVER (PARTITION BY m.id ORDER BY e.start) event_rank, ROW_NUMBER() OVER (PARTITION BY e.id ORDER BY p.created_at DESC) product_rank, counts.product_count FROM markets m JOIN events e ON m.id = e.market_id JOIN products_events pe ON e.id = pe.id_event JOIN products p ON pe.id_product = p.id JOIN (SELECT e.id event_id, COUNT(p.*) product_count FROM events e JOIN products_events pe ON e.id = pe.id_event JOIN products p ON pe.id_product = p.id GROUP BY e.id) counts ON e.id = counts.event_id WHERE e.start <= now()) new_products WHERE new_products.event_rank = 1 AND new_products.product_rank <= 4 GROUP BY event_id, market_id, product_count;"
  const eventsProductFeed = await db.query(newestProductsQuery)

  return eventsProductFeed
}

const addEvent = async (event) => {
  const dbParams = [event.market_id, event.start, event.end]
  const result = await db.query(
    "INSERT INTO events VALUES(Default,$1,$2,$3) RETURNING id",
    dbParams
  )
  return result[0].id
}

const getOrderEvent = async (order_id) => {
  const query =
    "SELECT events.id, events.start, events.endtime, markets.address, markets.city, reko_areas.name AS reko_name FROM events INNER JOIN orders ON orders.event_id = events.id INNER JOIN markets ON events.market_id = markets.id INNER JOIN reko_markets ON reko_markets.market_id=markets.id INNER JOIN reko_areas ON reko_areas.id = reko_markets.areas_id WHERE orders.id=$1"
  const event = await db.query(query, [order_id])
  return event[0]
}

const updateEvent = async (event, event_id) => {
  await db.query(
    "UPDATE events set market_id=$1, start=$2, endtime=$3 where id=$4",
    [event.market_id, event.start, event.end, event_id]
  )
}

const getMassEmail = async (events) => {
  const query =
    "SELECT json_agg(json_build_object('event', json_build_object('id', events.id, 'start', events.start, 'address', markets.address, 'area', reko_areas.area, 'reko_name', reko_areas.name), 'buyers',(SELECT jsonb_agg(DISTINCT jsonb_build_object('firstname', users.firstname, 'lastname', users.lastname, 'email', users.email)) FROM users INNER JOIN buyers ON buyers.id = users.id INNER JOIN orders ON orders.buyers_id = buyers.id WHERE orders.event_id=events.id),'sellers', (SELECT jsonb_agg(DISTINCT jsonb_build_object('firstname', users.firstname, 'lastname', users.lastname, 'seller_name', sellers.name, 'email', users.email )) from sellers INNER JOIN products ON products.sellers_id=sellers.id INNER JOIN products_events ON products.id = products_events.id_product INNER JOIN users ON users.id = sellers.id WHERE products_events.id_event=events.id))) FROM events INNER JOIN markets ON events.market_id = markets.id INNER JOIN reko_markets ON reko_markets.market_id = markets.id INNER JOIN reko_areas ON reko_areas.id = reko_markets.areas_id WHERE events.id=ANY($1::int[]) "
  const allevents = await db.query(query, [events])
  return allevents[0].json_agg
}

module.exports = {
  addProductToEvents,
  getSellersEvents,
  getMarketEvents,
  getEventsProductFeed,
  getEventsSellerHasProducts,
  addEvent,
  removeProductFromEvents,
  getEvents,
  updateEvent,
  getOrderEvent,
  getMassEmail,
  getMarketEvent,
}
