
const sellersRouter = require('express').Router()
const sellersService = require("../services/sellers")
const sellersRepository = require("../repositories/sellers")
const eventsRepository = require("../repositories/events")

sellersRouter.delete('/:id/image', async (req, res) => {
  const { id } = req.params
  if(!req.user || req.user.id != id){
    res.status(401).send("Current user doesn't match")
  } else{
    await sellersService.removeSellerImage(id, sellersRepository)
    return res.sendStatus(200).end()
  }

})

sellersRouter.put('/:id/image', async (req, res) => {
  console.log("REQ BODY",req.body)
  const { id } = req.params
  if(!req.user || req.user.id != id){
    res.status(401).send("Current user doesn't match")
  } else{
    await sellersService.updateSellerImage(id, req.body.image_id, sellersRepository)
    return res.sendStatus(200).end()
  }

})

sellersRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const seller = await sellersService.getSeller(id,sellersRepository)
  seller.events = await sellersService.getEventsSellerHasProducts(id, eventsRepository)
  res.send(seller)
})

sellersRouter.get("/events/:id", async (req, res) => {
  const { id } = req.params
  const events = await sellersService.getEventsSellerHasProducts(id, eventsRepository)
  res.send(events)
})

module.exports = sellersRouter