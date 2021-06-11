const usersRepository = require('../repositories/users')

const getUser = async (id) => {
    const user = await usersRepository.getUser(id)

    return user
}

const createUser = async (userData) => {
  const newUser = await usersRepository.createUser(userData)

  return newUser
}

<<<<<<< HEAD
const createUser = async (params, usersRepository) => {
  await usersRepository.createUser(params)
}

=======
>>>>>>> 8daa931741e8376dc1808db2211c1487624e3f3a
module.exports = { getUser, createUser }