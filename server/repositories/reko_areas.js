const db = require("../db")

const getRekoAreas = async () => {
  const reko_areas = db.query("SELECT * from reko_areas;")
  return reko_areas
}

const addRekoAreas = async (rekoArea) => {
  const dbParams = [rekoArea.name, rekoArea.area]
  const result = await db.query("INSERT INTO reko_areas VALUES(Default, $1, $2)", dbParams)
  return results
}

const addRekoMarkets = async (market_id, reko_areas) => {
  const rekoMarkets = reko_areas.map(reko_areas => [market_id, reko_areas.id])
  const query = format("INSERT INTO reko_markets (market_id,reko_areas.id) VALUES %L", rekoMarkets)
  await db.query(query, [])
}

module.exports = { getRekoAreas, addRekoAreas }