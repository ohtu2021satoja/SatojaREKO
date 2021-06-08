const ordersRouter = require('express').Router()
const ordersService = require("../services/orders")
const ordersRepository = require("../repositories/orders")
const productsRepository = require("../repositories/products")

ordersRouter.post('/buyer/:id', async (req, res) => {
  try{
    const { id } = req.params
    const orders = req.body.orders
    await ordersService.addBuyersOrders(id, orders, ordersRepository, productsRepository)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
  }
})

ordersRouter.get("/seller/:seller_id", async (req, res) => {
  try{
    const {seller_id} = req.params
    const orders = await ordersService.getSellersOrders(seller_id, ordersRepository)
    res.send(orders)
  } catch(error){
    console.log(error)
  }
})

ordersRouter.get("/buyer/:event_id/:buyer_id", async (req,res) => {
  try{
    const {event_id, buyer_id} = req.params
    const orders = await ordersService.getBuyersEventOrders(buyer_id, event_id, ordersRepository)
    res.send(orders)
  } catch(error){
    console.log(error)
  }
})

module.exports = ordersRouter