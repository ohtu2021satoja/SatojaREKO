const geoap = require("../geoap")

const getAllMarkets = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return(markets)
}

const addMarkets = async (market, reko_areas, marketsRepository, rekoAreasRepository) => {
    const location = await geoap.getAddressInfo(market.address)
    const newMarket = await marketsRepository.addMarkets(market, location)
    const newRekoMarket = await rekoAreasRepository.addRekoMarkets(reko_areas, newMarket)
}

module.exports = {getAllMarkets, addMarkets}