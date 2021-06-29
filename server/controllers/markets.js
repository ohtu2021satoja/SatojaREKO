const marketsRouter = require('express').Router()
const marketsService = require("../services/markets")
const marketsRepository = require("../repositories/markets")
const sellerService = require('../services/sellers')
const sellerRepository = require('../repositories/sellers')
const rekoAreasRepository = require("../repositories/reko_areas")
const middleware = require("../utils/middleware")
const usersRepository = require("../repositories/users")
const usersService = require("../services/users")

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
    if(req.user && await usersService.isAdmin(req.user.id, usersRepository)){
        try {
            const marketData = req.body
            await marketsService.addMarkets(marketData,req.body.reko_areas, marketsRepository, rekoAreasRepository)
            res.sendStatus(200).end()
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    else{
        res.status(401).send("Current user isn't admin")
    }

})

module.exports = marketsRouter