const geoap = require("../geoap")

const getAllMarketsThatHaveEvents = async (marketsRepository) => {
  let markets = await marketsRepository.getAllMarketsThatHaveEvents()
  console.log("MARKET_EVENTS", markets[0].market_events)
  markets.forEach((market) => {
    market.market_events = market.market_events.filter((event) => {
      return new Date(event.endtime) > new Date()
    })
  })
  markets = markets.filter((market) => market.market_events.length > 0)
  return markets
}

const addRekoMarket = async (
  market,
  reko_areas,
  marketsRepository,
  rekoAreasRepository
) => {
  const location = await geoap.getAddressInfo(market.address, market.city)
  console.log(location)
  const newMarket = await marketsRepository.addRekoMarket(market, location)
  console.log(reko_areas)
  const newRekoMarket = await rekoAreasRepository.addMarketToRekoAreas(
    reko_areas,
    newMarket
  )
}

const getAllMarkets = (marketsRepository) => {
  const markets = marketsRepository.getAllMarkets()
  return markets
}

const getMarket = async (id, marketsRepository) => {
  const market = await marketsRepository.getMarket(id)
  return market
}

module.exports = {
  getAllMarketsThatHaveEvents,
  addRekoMarket,
  getAllMarkets,
  getMarket,
}
