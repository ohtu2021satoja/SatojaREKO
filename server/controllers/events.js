const eventsRouter = require('express').Router()
const eventsService = require('../services/events')
const eventsRepository = require('../repositories/events')
const productsService = require("../services/products")
const productsRepository = require("../repositories/products")
const usersService = require("../services/users")
const usersRepository = require("../repositories/users")

eventsRouter.get('/seller/:id', async (req, res, next) => {
    const { id } = req.params
    if(! req.user || req.user.id != id){
      res.status(401).send("Current user isn't the seller")
    } else {
      const sellerEvents = await eventsService.getSellerEvents(id, eventsRepository)
      if (!sellerEvents) {
          return res.status(404).send({ error: 'Seller events not found' })
      }
      try {
          res.send(sellerEvents)
      } catch (err) {
          next(err)
      }
    }
})

eventsRouter.get("/:event_id/products/:product_id", async (req, res, next) => {
  const { event_id, product_id } = req.params
  console.log(event_id, product_id)
  const product = await productsService.getEventProduct(event_id, product_id, productsRepository)
  res.send(product)
})

eventsRouter.get('/market/:id', async (req,res) => {
  const {id} = req.params
  const marketEvents = await eventsService.getMarketEvents(id, eventsRepository)

  if (!marketEvents) {
    return res.status(404).send({ error: 'Market events not found' });
  }
  try {
    res.send(marketEvents)
  } catch (err) {
    next(err)
  }
})

eventsRouter.get('/market/:market_id/:event_id', async (req,res) => {
  const {market_id, event_id} = req.params
  const marketEvent = await eventsService.getMarketEvent(market_id, event_id, eventsRepository)

  if (!marketEvent) {
    return res.status(404).send({ error: 'Market events not found' });
  }
  try {
    res.send(marketEvent)
  } catch (err) {
    next(err)
  }
})

eventsRouter.get('/product/feed/', async (req,res) => {
  const eventProductFeed = await eventsService.getEventProductFeed(eventsRepository)

  if (!eventProductFeed) {
    return res.status(404).send({ error: 'Event products not found' });
  }
  try {
    res.send(eventProductFeed)
  } catch (err) {
    next(err)
  }

})

eventsRouter.post('/', async (req,res) =>{
  if(req.user && usersService.isAdmin(req.user.id, usersRepository)){
    try{
      req.body.start = new Date(req.body.start)
      req.body.end = new Date(req.body.end)
      await eventsService.addEvent(req.body, eventsRepository)
      res.sendStatus(200).end()
    } catch(error){
      console.log(error)
    }
  } else{
    res.status(401).send("Current user isn't admin")
  }

})

eventsRouter.put("/:id", async (req, res,next) => {
  const { id } = req.params
  try{
    await eventsService.updateEvent(req.body, id, eventsRepository)
    res.send("Event updated")
  }catch(error){
    next(error)
  }
})

eventsRouter.get("/", async (req, res, next) => {
  try{
    const events = await eventsService.getEvents(eventsRepository)
    res.send(events)
  }catch(error){
    next(error)
  }
})

module.exports = eventsRouter

