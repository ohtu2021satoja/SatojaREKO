const marketsRouter = require('express').Router()
const marketsService = require("../services/markets")
const marketsRepository = require("../repositories/markets")
const sellerService = require('../services/sellers')
const sellerRepository = require('../repositories/sellers')
const rekoAreasRepository = require("../repositories/reko_areas")
const middleware = require("../utils/middleware")

marketsRouter.get("/map", async (req, res, next) => {
    try {
        const markets = await marketsService.getAllMarketsThatHaveEvents(marketsRepository)
        const seller = await sellerService.getAllSellers(sellerRepository)
        res.status(200).json({"Markets": markets, "Sellers": seller})
    } catch (err){
        console.log(err)
        next(err)
    }
})

marketsRouter.get("/", async (req, res, next) => {
    try {
        const markets = await marketsService.getAllMarkets(marketsRepository)
        res.send(markets)
    } catch (err) {
        console.log(err)
        next(err)
    }
})


marketsRouter.post('/', async (req, res) => {
    try {
        const marketData = req.body
        console.log(marketData)
        await marketsService.addMarkets(marketData,req.body.reko_areas, marketsRepository, rekoAreasRepository)
        res.sendStatus(200).end()
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = marketsRouter