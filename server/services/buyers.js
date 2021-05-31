const updateNewsLetterCheck = async (id, check, buyersRepository) => {
  await buyersRepository.updateNewsLetterCheck(id, check)
}

module.exports = { updateNewsLetterCheck }