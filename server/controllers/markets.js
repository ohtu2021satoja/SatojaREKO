const marketsRouter = require('express').Router()
const marketsService = require("../services/markets")
const marketsRepository = require("../repositories/markets")
const sellerService = require('../services/sellers')

marketsRouter.get("/", async (req, res, next) => {
    try {
        const markets = await marketsService.getAllMarkets(marketsRepository)
        //const seller = await sellerService.getAllSellers()
        res.status(200).json({"Markets": markets, "Sellers": seller})
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = marketsRouter