const BLANK_IMAGE = "profile-blank_or75kg"

const removeBuyerImage = async (id, buyersRepository) => {
  await buyersRepository.updateBuyersImage(id, BLANK_IMAGE)
}

const updateBuyerImage = async(id, image_url, buyersRepository) => {
  await buyersRepository.updateBuyersImage(id, image_url)
}

const updateBuyersInfo= async (seller_id, req_body, buyersRepository, usersRepository) => {
  await buyersRepository.updateBuyersInfo(seller_id, req_body.buyer_info)

  await usersRepository.updateUsersInfo(seller_id, req_body.user_info)
}

const createBuyer = async (id, params, buyersRepository, usersRepository) => {
  if(!params.image_url){
    params.image_url = BLANK_IMAGE
  }
  if(!params.newsletter_check){
    params.newsletter_check=false
  }
  if(!params.cancel_notification_check){
    params.cancel_notification_check=false
  }
  await buyersRepository.createBuyer(id, params)

  await usersRepository.setAsBuyer(id)
}


module.exports = { removeBuyerImage, updateBuyersInfo, updateBuyerImage, createBuyer }