const db = require("../db")

const getAllMarkets = async () => {
    const markets = await db.query("SELECT markets.id, markets.address, markets.type, markets.location, json_agg(json_build_object('event_id', events.id, 'start', events.start, 'endtime', events.endtime)) AS market_events FROM markets INNER JOIN events ON events.market_id = markets.id GROUP BY(markets.id, markets.type, markets.location)")
    return markets
}

module.exports = { getAllMarkets }