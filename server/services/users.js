const usersRepository = require('../repositories/users')
const BLANK_IMAGE = "profile-blank_or75kg"

const getUser = async (id) => {
    const user = await usersRepository.getUser(id)
    console.log(user)
    return user
}

const createUser = async (params, usersRepository, sellersRepository, buyersRepository ) => {
  params.image_url = BLANK_IMAGE
  params.location = [null, null]
  const user_id = await usersRepository.createUser(params)
  console.log(user_id)
  await sellersRepository.createSeller(user_id, params)
  await buyersRepository.createBuyer(user_id, params)
}

module.exports = { getUser, createUser }