const sellersRouter = require('express').Router()
const sellersService = require("../services/sellers")
const sellersRepository = require("../repositories/sellers")
const eventsRepository = require("../repositories/events")

sellersRouter.put('/:id/salesreport_check', async (req, res) => {
  const { id } = req.params
  const check = req.body.check
  await  sellersService.updateSalesReportCheck(id, check, sellersRepository)
  return res.sendStatus(200).end()
})

sellersRouter.delete('/:id/image', async (req, res) => {
  const { id } = req.params
  await sellersService.removeSellerImage(id, sellersRepository)
  return res.sendStatus(200).end()
})

sellersRouter.get("/events/:id", async (req, res) => {
  const { id } = req.params
  const events = await sellersService.getEventsSellerHasProducts(id, eventsRepository)
  res.send(events)
})

module.exports = sellersRouter