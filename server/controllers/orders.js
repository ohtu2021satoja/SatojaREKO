const ordersRouter = require('express').Router()
const ordersService = require("../services/orders")
const ordersRepository = require("../repositories/orders")
const productsRepository = require("../repositories/products")

ordersRouter.post('/buyer/:id', async (req, res, next) => {
  const { id } = req.params

  if(!req.user || req.user.id != id){
    res.sendStatus(401)
  } else {
    try{
      const orders = req.body.orders
      await ordersService.addBuyersOrders(id, orders, ordersRepository, productsRepository)
      res.sendStatus(200).end()
    } catch(error){
      next(error)
    }
  }
})

ordersRouter.get("/seller/:seller_id", async (req, res) => {
  const {seller_id} = req.params

  if(!req.user || req.user.id != seller_id){
    res.sendStatus(401)
  } else {
    try{
     
      const orders = await ordersService.getSellersOrders(seller_id, ordersRepository)
      res.send(orders)
    } catch(error){
      console.log(error)
    }
  }

})

ordersRouter.get("/buyer/:buyer_id", async (req,res, next) => {
  const {buyer_id} = req.params

  if(!req.user || req.user.id != buyer_id){
    res.sendStatus(401)
  } else {
    try{
      const orders = await ordersService.getBuyersOrders(buyer_id, ordersRepository)
      res.send(orders)
    } catch(error){
      next(error)
  }
  }
})

ordersRouter.delete("/seller/:seller_id/:order_id", async (req, res) => {
  const {seller_id, order_id} = req.params
  if(!req.user || req.user.id != seller_id){
    res.sendStatus(401)
  } else {
    await ordersService.removeSellersOrder(seller_id, order_id, ordersRepository, productsRepository)
    res.send(200).end()
  }

})

module.exports = ordersRouter