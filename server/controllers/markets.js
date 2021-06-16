const marketsRouter = require('express').Router()
const marketsService = require("../services/markets")
const marketsRepository = require("../repositories/markets")
const sellerService = require('../services/sellers')
const sellerRepository = require('../repositories/sellers')
const rekoAreasRepository = require("../repositories/reko_areas")

marketsRouter.get("/map", async (req, res, next) => {
    try {
        const markets = await marketsService.getAllMarkets(marketsRepository)
        const seller = await sellerService.getAllSellers(sellerRepository)
        res.status(200).json({"Markets": markets, "Sellers": seller})
    } catch (err) {
        console.log(err)
        next(err)
    }
})


marketsRouter.post('/', async (req, res) => {
    try {
        const marketData = req.body
        await marketsService.addMarkets(marketData,req.body.areas, marketsRepository, rekoAreasRepository)
        res.sendStatus(200).end()
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = marketsRouter