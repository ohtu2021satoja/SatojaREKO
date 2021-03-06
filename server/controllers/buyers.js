const buyersRouter = require('express').Router()
const buyersService = require("../services/buyers")
const buyersRepository = require("../repositories/buyers")


buyersRouter.delete('/:id/image', async (req, res) => {
  const { id } = req.params
  
  if(! req.user || req.user.id != id){
    res.status(401).send("Current user isn't the buyer")
  } else{
    await buyersService.removeBuyerImage(id, buyersRepository)
    res.sendStatus(200).end()
  }

})

buyersRouter.put('/:id/image', async (req, res) => {
  const { id } = req.params

  if(! req.user || req.user.id != id){
    res.status(401).send("Current user isn't the buyer")
  } else {
    await buyersService.updateBuyerImage(id, req.body.image_id, buyersRepository)
    return res.sendStatus(200).end()
  }

})


buyersRouter.put('/:id/cancel_notification_check', async (req, res) => {
  const { id } = req.params

  if(! req.user || req.user.id != id){
    res.status(401).send("Current user isn't the buyer")
  } else {
    const check = req.body.check
    await  buyersService.updateCancelNotificationCheck(id, check, buyersRepository)
    return res.sendStatus(200).end()
  }

})

module.exports = buyersRouter