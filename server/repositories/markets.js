const db = require("../db")

const getAllMarkets = async () => {
    const markets = await db.query("SELECT * FROM markets")
    return markets
}

module.exports = { getAllMarkets }