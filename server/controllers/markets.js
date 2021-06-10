const marketsRouter = require('express').Router()
const marketsService = require("../services/markets")
const marketsRepository = require("../repositories/markets")

marketsRouter.get('/', async (req, res) => {
    try {
        const markets = await marketsService.getAllMarkets(marketsRepository)
        res.status(200).json(markets);
    } catch (err) {
        console.log(err)
        next(err)
    }
})

marketsRouter.post('/', async (req, res) => {
    try {
        const marketData = req.body
        await marketsService.addMarkets(marketData,req.body.location, marketsRepository)
        res.sendStatus(200).end()
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = marketsRouter