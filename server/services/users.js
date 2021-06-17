const BLANK_IMAGE = "profile-blank_or75kg"

const getUser = async (id, usersRepository) => {
    const user = await usersRepository.getUser(id)
    console.log(user)
    return user
}

const getUserByEmail = async (email, usersRepository) => {
  const user = await usersRepository.getUserByEmail(email)
  return(user)
}

const addPasswordToUser = async (id, password, usersRepository) => {
  await usersRepository.addPasswordToUser(id, password)
}

const createUser = async (params, usersRepository, sellersRepository, buyersRepository ) => {
  params.image_url = BLANK_IMAGE
  params.location = [null, null]
  const user_id = await usersRepository.createUser(params)
  console.log(user_id)
  await sellersRepository.createSeller(user_id, params)
  await buyersRepository.createBuyer(user_id, params)
}

const deleteUser = async (id, usersRepository, productsRepository) => {
  await productsRepository.addUsersOrdersQuantitiesToSizes(id)
  await usersRepository.deleteUser(id)
}

module.exports = { getUser, createUser, deleteUser, getUserByEmail, addPasswordToUser }