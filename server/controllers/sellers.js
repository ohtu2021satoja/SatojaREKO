
const sellersRouter = require('express').Router()
const sellersService = require("../services/sellers")
const sellersRepository = require("../repositories/sellers")
const eventsRepository = require("../repositories/events")
const usersRepository = require("../repositories/users")

sellersRouter.put('/:id', async (req, res) => {
  console.log(req.body)
  const { id } = req.params
  await  sellersService.updateSellersInfo(id, req.body, sellersRepository, usersRepository)
  return res.sendStatus(200).end()
})

sellersRouter.delete('/:id/image', async (req, res) => {
  const { id } = req.params
  await sellersService.removeSellerImage(id, sellersRepository)
  return res.sendStatus(200).end()
})

sellersRouter.put('/:id/image', async (req, res) => {
  const { id } = req.params
  await sellersService.updateSellerImage(id, req.body.image_url, sellersRepository)
  return res.sendStatus(200).end()
})

sellersRouter.get("/events/:id", async (req, res) => {
  const { id } = req.params
  const events = await sellersService.getEventsSellerHasProducts(id, eventsRepository)
  res.send(events)
})

module.exports = sellersRouter