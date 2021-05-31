const getSellerEvents = async (id, eventsRepository) => {
  const sellerEvents = await eventsRepository.getSellersEvents(id)
  return(sellerEvents)
}

module.exports = { getSellerEvents }