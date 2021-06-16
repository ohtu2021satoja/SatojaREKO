const db = require("../db")
const format = require("pg-format")

const getRekoAreas = async () => {
  const reko_areas = db.query("SELECT * from reko_areas;")
  return reko_areas
}

const addRekoAreas = async (rekoArea) => {
  const dbParams = [rekoArea.name, rekoArea.area]
  const result = await db.query("INSERT INTO reko_areas VALUES(Default, $1, $2)", dbParams)
  return results
}

const addRekoMarkets = async (reko_areas, market_id) => {
  const rekoMarkets = reko_areas.map(reko_areas => [reko_areas, market_id])
  const query = format("INSERT INTO reko_markets (areas_id,market_id) VALUES %L", rekoMarkets)
  await db.query(query, [])
}

module.exports = { getRekoAreas, addRekoAreas, addRekoMarkets }