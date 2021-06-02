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

module.exports = eventsRouter