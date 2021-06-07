const BLANK_IMAGE = "profile-blank_or75kg"

const updateNewsLetterCheck = async (id, check, buyersRepository) => {
  await buyersRepository.updateNewsLetterCheck(id, check)
}

const updateCancelNotificationCheck = async (id, check, buyersRepository) => {
  await buyersRepository.updateCancelNotificationCheck(id, check)
}

const removeBuyerImage = async (id, buyersRepository) => {
  await buyersRepository.updateBuyersImage(id, BLANK_IMAGE)
}

const updateBuyerImage = async(id, image_url, buyersRepository) => {
  await buyersRepository.updateBuyersImage(id, image_url)
}

const updateBuyersInfo= async (seller_id, req_body, sellersRepository, usersRepository) => {
  await sellersRepository.updateBuyersInfo(seller_id, req_body.buyer_info)

  await usersRepository.updateUsersInfo(seller_id, req_body.user_info)
}


module.exports = { updateNewsLetterCheck, updateCancelNotificationCheck, removeBuyerImage, updateBuyersInfo, updateBuyerImage }