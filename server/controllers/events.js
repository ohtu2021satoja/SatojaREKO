const eventsRouter = require('express').Router()
const db = require("../services/db")


eventsRouter.get('/seller/:id', async (req, res) => {
  const { id } = req.params
  const query = "SELECT *, reko_areas.name FROM events INNER JOIN markets ON markets.id = events.market_id INNER JOIN reko_markets ON markets.id = reko_markets.market_id INNER JOIN reko_areas ON reko_markets.areas_id=reko_areas.id INNER JOIN sellers_reko ON sellers_reko.reko_area_id=reko_areas.id INNER JOIN sellers ON sellers.id = sellers_reko.seller_id WHERE sellers.id=$1"
  const sellerEvents = await  db.query(query,[id]);
  if (!sellerEvents) {
    return res.status(404).send({ error: 'Seller events not found' });
  }
  try {
    res.status(200).json(sellerEvents)
  } catch (err) {
    next(err)
  }
})

module.exports = eventsRouter