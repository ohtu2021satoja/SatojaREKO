const buyersRouter = require('express').Router()
const buyersService = require("../services/buyers")
const buyersRepository = require("../repositories/buyers")
const usersRepository = require("../repositories/users")

buyersRouter.put('/info/:id', async (req, res) => {
  const { id } = req.params
  await  buyersService.updateBuyersInfo(id, req.body, buyersRepository, usersRepository)
  return res.sendStatus(200).end()
})


buyersRouter.delete('/:id/image', async (req, res) => {
  const { id } = req.params
  await buyersService.removeBuyerImage(id, buyersRepository)
  return res.sendStatus(200).end()
})

buyersRouter.put('/:id/image', async (req, res) => {
  const { id } = req.params
  await buyersService.updateBuyerImage(id, req.body.image_url, buyersRepository)
  return res.sendStatus(200).end()
})

buyersRouter.put('/:id/cancel_notification_check', async (req, res) => {
  const { id } = req.params
  const check = req.body.check
  await  buyersService.updateCancelNotificationCheck(id, check, buyersRepository)
  return res.sendStatus(200).end()
})

module.exports = buyersRouter