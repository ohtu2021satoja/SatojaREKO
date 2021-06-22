const db = require("../db")

const getAllMarketsThatHaveEvents = async () => {
    const markets = await db.query("SELECT markets.id, markets.address, markets.type, markets.location, (SELECT jsonb_agg(jsonb_build_object('id', res.id, 'start', res.start, 'endtime', res.endtime)) FROM (select DISTINCT events.id AS id, events.start AS start, events.endtime AS endtime FROM   events INNER JOIN markets ON events.market_id = markets.id INNER JOIN products_events ON products_events.id_event = events.id ORDER BY events.start) AS res) AS market_events FROM markets INNER JOIN events ON events.market_id = markets.id INNER JOIN products_events ON products_events.id_event=events.id GROUP BY(markets.id, markets.type)")
    console.log(markets[0].market_events)
    return markets
}

const getAllMarkets = async () => {
    const markets = await db.query("select DISTINCT jsonb_agg( jsonb_build_object('start', res.start, 'id', res.id, 'endtime', res.endtime)) from (select DISTINCT events.id, events.start, events.endtime FROM events INNER JOIN markets ON events.market_id=markets.id INNER JOIN products_events ON products_events.id_event = events.id ORDER BY events.start) AS res;")
    return markets
}
const addMarkets = async (market, location) => {
    const dbParams = [market.address, `{"lat":"${location[0]}","lon":"${location[1]}"}`, market.type]
    const result = await db.query("INSERT INTO markets VALUES(Default, $1, $2, $3) RETURNING id", dbParams)
    return result[0].id
}

module.exports = { getAllMarketsThatHaveEvents, addMarkets, getAllMarkets }
