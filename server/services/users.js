const BLANK_IMAGE = "profile-blank_or75kg"
const bcrypt = require("bcrypt")

const getUser = async (id, usersRepository) => {
    const user = await usersRepository.getUser(id)
    console.log(user)
    return user
}

const getUserByEmail = async (email, usersRepository) => {
  const user = await usersRepository.getUserByEmail(email)
  return(user)
}

const setUserPassword = async (id, password, usersRepository) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  await setUserPasswordHash(id, passwordHash, usersRepository)
}
const setUserPasswordHash = async (id, passwordHash, usersRepository) => {
  await usersRepository.setUserPassword(id, passwordHash)
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

const updateOldPassword = async (user, old_password, new_password, usersRepository ) => {
  if(await bcrypt.compare(old_password, user.password)){
    await setUserPassword(user.id, new_password, usersRepository)
  } else {
    const error = new Error("Incorrect password")
    error.status = 400
    throw error
  }
}

const updateUsersInfo = async (id, user_info) => {
  await usersRepository.updateUsersInfo(id, user_info)
}


module.exports = { getUser, createUser, deleteUser, getUserByEmail, setUserPassword, updateOldPassword, setUserPasswordHash, updateUsersInfo }