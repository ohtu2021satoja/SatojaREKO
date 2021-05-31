const updateNewsLetterCheck = async (id, check, buyersRepository) => {
  await buyersRepository.updateNewsLetterCheck(id, check)
}

const updateCancelNotificationCheck = async (id, check, buyersRepository) => {
  await buyersRepository.updateCancelNotificationCheck(id, check)
}


module.exports = { updateNewsLetterCheck, updateCancelNotificationCheck }