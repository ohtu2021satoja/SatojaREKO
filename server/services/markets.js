const geoap = require("../geoap")

const getAllMarkets = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return(markets)
}

const addMarkets = async (market, location, marketsRepository) => {
    const address = await geoap.getAddressInfo(market.address)
    const newMarket = await marketsRepository.addMarkets(market, address)
}

module.exports = {getAllMarkets, addMarkets}