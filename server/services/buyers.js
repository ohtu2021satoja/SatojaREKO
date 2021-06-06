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


module.exports = { updateNewsLetterCheck, updateCancelNotificationCheck, removeBuyerImage }