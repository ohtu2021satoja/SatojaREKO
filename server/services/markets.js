const geoap = require("../geoap")

const getAllMarketsThatHaveEvents = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarketsThatHaveEvents()
    return(markets)
}

const addMarkets = async (market, reko_areas, marketsRepository, rekoAreasRepository) => {
    const location = await geoap.getAddressInfo(market.address)
    const newMarket_id = await marketsRepository.addMarkets(market, location)
    console.log(reko_areas)
    const newRekoMarket = await rekoAreasRepository.addRekoMarkets(reko_areas, newMarket_id)
    return newMarket_id
}

const getAllMarkets = (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return markets
}

const getMarket = async (id, marketsRepository) => {
    const market = await marketsRepository.getMarket(id)
    return market
}

module.exports = {getAllMarketsThatHaveEvents, addMarkets, getAllMarkets, getMarket}