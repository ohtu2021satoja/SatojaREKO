const db = require("../db")

const getAllMarketsThatHaveEvents = async () => {
    const markets = await db.query("SELECT markets.id, markets.address, markets.type, markets.location, json_agg(json_build_object('event_id', events.id, 'start', events.start, 'endtime', events.endtime)) AS market_events FROM markets INNER JOIN events ON events.market_id = markets.id GROUP BY(markets.id, markets.type)")
    return markets
}

const getAllMarkets = async () => {
    const markets = await db.query("SELECT * from markets")
    return markets
}
const addMarkets = async (market, location) => {
    const dbParams = [market.address, `{"lat":"${location[0]}","lon":"${location[1]}"}`, market.type]
    const result = await db.query("INSERT INTO markets VALUES(Default, $1, $2, $3) RETURNING id", dbParams)
    return result[0].id
}

module.exports = { getAllMarketsThatHaveEvents, addMarkets, getAllMarkets }
