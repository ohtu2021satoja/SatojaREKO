const buyersRouter = require('express').Router()
const buyersService = require("../services/buyers")
const buyersRepository = require("../repositories/buyers")

buyersRouter.put('/:id/newsletter_check', async (req, res) => {
  const { id } = req.params
  const check = req.body.check
  await  buyersService.updateNewsLetterCheck(id, check, buyersRepository)
  return res.sendStatus(200).end()
})

buyersRouter.put('/:id/cancel_notification_check', async (req, res) => {
  const { id } = req.params
  const check = req.body.check
  await  buyersService.updateCancelNotificationCheck(id, check, buyersRepository)
  return res.sendStatus(200).end()
})

module.exports = buyersRouter