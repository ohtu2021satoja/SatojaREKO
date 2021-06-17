const usersRouter = require('express').Router()
const usersService = require("../services/users")
const buyersService = require("../services/buyers")
const sellersService = require("../services/sellers")


const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")
usersRouter.put('/:id', async (req, res) => {
  const { id } = req.params

  if(! req.user || req.user.id != id){
    res.sendStatus(401)
  }
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

usersRouter.get("/current/user", async (req, res, next) => {
  if(!req.user){
    return res.send(null)
  }
  const user = await usersService.getUser(req.user.id, usersRepository)
  if (!user) {
      return res.status(404).send({ error: 'User not found' })
  }
  try {
      res.send(user)
  } catch (err) {
      next(err)
  }
})

module.exports = usersRouter