
const BLANK_IMAGE = "profile-blank_or75kg"

const updateSellersInfo= async (seller_id, req_body, sellersRepository, usersRepository) => {
  const delete_reko_areas = req_body.reko_areas.delete
  await sellersRepository.deleteRekoAreas(seller_id, delete_reko_areas)

  const add_reko_areas = req_body.reko_areas.add
  await sellersRepository.addRekoAreas(seller_id, add_reko_areas)

  await sellersRepository.updateSellersInfo(seller_id, req_body.seller_info)

  await usersRepository.updateUsersInfo(seller_id, req.body.user_info)
}

const removeSellerImage = async (id, sellersRepository) => {
  await sellersRepository.updateSellersImage(id, BLANK_IMAGE)
}

getEventsSellerHasProducts = async (id, eventsRepository) => {
  const events = await eventsRepository.getEventsSellerHasProducts(id)
  return(events)
} 

module.exports = { removeSellerImage, getEventsSellerHasProducts, updateSellersInfo }