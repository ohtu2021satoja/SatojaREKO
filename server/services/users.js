const getUser = async (id, usersRepository) => {
  const user = await usersRepository.getUser(id)
  return(user)
}

const createUser = async (params, usersRepository) => {
  await usersRepository.createUser(params)
}

module.exports = { getUser, createUser }