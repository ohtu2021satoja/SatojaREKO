const getSellerEvents = async (id, eventsRepository) => {
  const sellerEvents = await eventsRepository.getSellersEvents(id)
  return(sellerEvents)
}

const getMarketEvents = async (market_id, eventsRepository) => {
  const marketEvents = await eventsRepository.getMarketEvents(market_id)
  return(marketEvents)
}

const getEventProductFeed = async (eventsRepository) => {
  const eventProductFeed = await eventsRepository.getEventsProductFeed()
  return eventProductFeed
}
const addEvent = async (event, eventsRepository) => {
  const newEvent = await eventsRepository.addEvent(event)
  return newEvent
}
module.exports = { getSellerEvents, getMarketEvents, getEventProductFeed, addEvent }