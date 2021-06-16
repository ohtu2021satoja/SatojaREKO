const ordersRouter = require('express').Router()
const ordersService = require("../services/orders")
const ordersRepository = require("../repositories/orders")
const productsService = require("../services/products")
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

ordersRouter.get("/buyer/:buyer_id", async (req,res) => {
  try{
    const {buyer_id} = req.params
    const orders = await ordersService.getBuyersOrders(buyer_id, ordersRepository)
    res.send(orders)
  } catch(error){
    console.log(error)
  }
})

ordersRouter.delete("/seller/:seller_id/:order_id", async (req, res) => {
  const {seller_id, order_id} = req.params
  await ordersService.removeSellersOrder(seller_id, order_id, ordersRepository, productsRepository)
  res.send(200).end()
})

module.exports = ordersRouter