const usersRouter = require('express').Router()
<<<<<<< HEAD
const usersService = require("../services/users")
const buyersService = require("../services/buyers")
const sellersService = require("../services/sellers")


const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")
usersRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  if(req.body.seller_update){
    await sellersService.updateSellersInfo(id, req.body, sellersRepository, usersRepository)
  } else {
    await buyersService.updateBuyersInfo(id, req.body, buyersRepository, usersRepository)
  }
  res.sendStatus(200).end()
})

usersRouter.post("/", async (req, res) => {
  await usersService.createUser(req.body, usersRepository)
  res.sendStatus(200)
})

=======
const usersService = require('../services/users')
const usersRepository = require('../repositories/users')
>>>>>>> 8daa931741e8376dc1808db2211c1487624e3f3a

usersRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const user = await usersService.getUser(id, usersRepository)
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