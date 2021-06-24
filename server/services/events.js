const getSellerEvents = async (id, eventsRepository) => {
    const sellerEvents = await eventsRepository.getSellersEvents(id)
    return(sellerEvents)
}

const getMarketEvents = async (market_id, eventsRepository) => {
  const marketEvents = await eventsRepository.getMarketEvents(market_id)
  return(marketEvents)
}

const getMarketEvent = async (market_id, event_id, eventsRepository) => {
  const marketEvent = await eventsRepository.getMarketEvent(market_id, event_id)
  return(marketEvent)
}

const getEventProductFeed = async (eventsRepository) => {
  const eventProductFeed = await eventsRepository.getEventsProductFeed()
  return eventProductFeed
}
const addEvent = async (event, eventsRepository) => {
  const newEvent = await eventsRepository.addEvent(event)
  return newEvent
}

const updateEvent = async (event, event_id, eventsRepository) => {
  await eventsRepository.updateEvent(event, event_id)
}

const getEvents = async (eventsRepository) => {
  const events = await eventsRepository.getEvents()
  return events
}
module.exports = { getSellerEvents, getMarketEvents, getEventProductFeed, addEvent, getEvents, updateEvent, getMarketEvent }