const geoap = require("../geoap")

const getAllMarketsThatHaveEvents = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarketsThatHaveEvents()
    return(markets)
}

const addMarkets = async (market, reko_areas, marketsRepository, rekoAreasRepository) => {
    const location = await geoap.getAddressInfo(market.address)
    const newMarket = await marketsRepository.addMarkets(market, location)
    console.log(reko_areas)
    const newRekoMarket = await rekoAreasRepository.addRekoMarkets(reko_areas, newMarket)
}

const getAllMarkets = (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return markets
}

module.exports = {getAllMarketsThatHaveEvents, addMarkets, getAllMarkets}