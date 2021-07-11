const usersRouter = require("../controllers/users")
const geoap = require("../geoap")

const BLANK_IMAGE = "profile-blank_or75kg"

const updateSellersInfo = async (
  seller_id,
  req_body,
  sellersRepository,
  usersRepository
) => {
  let reko_areas = req_body.seller_info.reko_areas
  reko_areas = reko_areas.filter((reko_area) => reko_area.belongs === true)
  const new_reko_areas = reko_areas.map((reko_area) => reko_area.id)
  const old_reko_areas = await sellersRepository.getSellersRekoAreasIds(
    seller_id
  )
  console.log("OLD REKO ARES", old_reko_areas)
  const delete_reko_areas = old_reko_areas.filter(
    (reko_area) => !new_reko_areas.includes(reko_area)
  )
  if (delete_reko_areas.length > 0) {
    await sellersRepository.deleteRekoAreas(seller_id, delete_reko_areas)
  }
  const add_reko_areas = new_reko_areas.filter(
    (reko_area) => !old_reko_areas.includes(reko_area)
  )

  if (add_reko_areas.length > 0) {
    await sellersRepository.addRekoAreas(seller_id, add_reko_areas)
  }

  req_body.seller_info.location = await geoap.getAddressInfo(
    req_body.seller_info.address,
    req_body.seller_info.city ? req_body.seller_info.city : ""
  )

  await sellersRepository.updateSellersInfo(seller_id, req_body.seller_info)
}

const removeSellerImage = async (id, sellersRepository) => {
  await sellersRepository.updateSellersImage(id, BLANK_IMAGE)
}

const updateSellerImage = async (id, image_url, sellersRepository) => {
  await sellersRepository.updateSellersImage(id, image_url)
}

getEventsSellerHasProducts = async (id, eventsRepository) => {
  const events = await eventsRepository.getEventsSellerHasProducts(id)
  return events
}

getAllSellers = async (sellersRepository) => {
  const sellers = await sellersRepository.getAllSellers()
  return sellers
}

const getSeller = async (seller_id, sellersRepository) => {
  const seller = await sellersRepository.getSeller(seller_id)
  return seller
}

module.exports = {
  removeSellerImage,
  getEventsSellerHasProducts,
  updateSellersInfo,
  updateSellerImage,
  getAllSellers,
  getSeller,
}
