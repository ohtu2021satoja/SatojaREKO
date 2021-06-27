const db = require("../db")

const getAllMarketsThatHaveEvents = async () => {
    const markets = await db.query("SELECT m.id, m.address, m.type, m.location, (SELECT jsonb_agg(jsonb_build_object('id', res.id, 'start', res.start, 'endtime', res.endtime)) FROM (select DISTINCT events.id AS id, events.start AS start, events.endtime AS endtime FROM   events INNER JOIN products_events ON products_events.id_event = events.id WHERE events.market_id = m.id ORDER BY events.start) AS res) AS market_events FROM markets m INNER JOIN events ON events.market_id = m.id INNER JOIN products_events ON products_events.id_event=events.id GROUP BY(m.id, m.type)")
    console.log(markets[0].market_events)
    return markets
}

const getAllMarkets = async () => {
    const markets = await db.query("select * from markets")
    return markets
}
const addMarkets = async (market, location) => {
    const dbParams = [market.address, `{"lat":"${location[0]}","lon":"${location[1]}"}`, market.type]
    const result = await db.query("INSERT INTO markets VALUES(Default, $1, $2, $3) RETURNING id", dbParams)
    return result[0].id
}

const getMarket = async (id) => {
    const market = await db.query("SELECT *, reko_areas.name AS reko_name from markets INNER JOIN reko_markets ON markets.id = reko_markets.market_id INNER JOIN reko_areas ON reko_areas.id = reko_markets.areas_id WHERE markets.id=$1", [id])
    return market[0]
}

module.exports = { getAllMarketsThatHaveEvents, addMarkets, getAllMarkets, getMarket }
