const eventsRouter = require('express').Router()
const eventsService = require('../services/events')
const eventsRepository = require('../repositories/events')

eventsRouter.get('/seller/:id', async (req, res, next) => {
    const { id } = req.params
    const sellerEvents = await eventsService.getSellerEvents(id, eventsRepository)
    if (!sellerEvents) {
        return res.status(404).send({ error: 'Seller events not found' })
    }
    try {
        res.status(200).json(sellerEvents)
    } catch (err) {
        next(err)
    }
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

eventsRouter.get('/product/feed/', async (req,res) => {
  const {id} = req.params
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
  try{
    const event = req.body
    req.body.start = new Date(req.body.start)
    req.body.end = new Date(req.body.end)
    await eventsService.addEvent(event, eventsRepository)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
  }
})

module.exports = eventsRouter

