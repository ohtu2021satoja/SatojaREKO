const usersRepository = require('../repositories/users')

const getUser = async (id) => {
    const user = await usersRepository.getUser(id)

    return user
}

const createUser = async (userData) => {
  const newUser = await usersRepository.createUser(userData)

  return newUser
}

module.exports = { getUser, createUser }