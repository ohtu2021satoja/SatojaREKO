const usersRouter = require('express').Router()
const usersService = require('../services/users')
const usersRepository = require('../repositories/users')

usersRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const user = await  usersService.getUser(id, usersRepository)
    if (!user) {
        return res.status(404).send({ error: 'User not found' })
    }
    try {
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
})

module.exports = usersRouter