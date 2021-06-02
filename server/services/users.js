const getUser = async (id, usersRepository) => {
    const user = await usersRepository.getUser(id)
    return(user)
}

module.exports = { getUser }