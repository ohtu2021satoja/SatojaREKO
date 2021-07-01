const geoap = require("../geoap")

const getAllMarketsThatHaveEvents = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarketsThatHaveEvents()
    return(markets)
}

const addRekoMarket = async (market, reko_areas, marketsRepository, rekoAreasRepository) => {
    const location = await geoap.getAddressInfo(market.address)
    const newMarket = await marketsRepository.addRekoMarket(market, location)
    console.log(reko_areas)
    const newRekoMarket = await rekoAreasRepository.addMarketToRekoAreas(reko_areas, newMarket)
}

const getAllMarkets = (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return markets
}

const getMarket = async (id, marketsRepository) => {
    const market = await marketsRepository.getMarket(id)
    return market
}

module.exports = {getAllMarketsThatHaveEvents, addRekoMarket, getAllMarkets, getMarket}