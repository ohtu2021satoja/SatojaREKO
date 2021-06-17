const productsRouter = require("express").Router();
const productService = require("../services/products")
const productsRepository = require("../repositories/products")
const eventsRepository = require("../repositories/events")
const db = require("../db")
productsRouter.get("/", async (req, res) => {
  console.log("USEEEEEER",req.user)
  try {
    const products = await productService.getAllProducts(productsRepository)
    res.status(200).json(products);
  } catch (err) {
    console.log(err)
    next(err)
  }
});

productsRouter.get('/seller/:id', async (req, res) => {
  const { id } = req.params
  const products = await productService.getSellersProducts(id, productsRepository)
  if (!products) {
    return res.status(404).send({ error: 'Sellers products not found' });
  }
  try {
    res.send(products)
  } catch (err) {
    next(err)
  }
})

productsRouter.get("/events/:id", async (req, res) => {
  const { id } = req.params
  const products = await productService.getEventProducts(id, productsRepository)
  if (!products) {
    return res.status(404).send({ error: 'Sellers products not found' });
  }
  try {
    res.send(products)
  } catch (err) {
    next(err)
  }
})

productsRouter.get("/events/:event_id/:seller_id", async (req, res) => {
  const { event_id, seller_id } = req.params
  const products = await productService.getSellersEventProducts(event_id, seller_id, productsRepository)
  if (!products) {
    return res.status(404).send({ error: 'Sellers products not found' });
  }
  try {
    res.send(products)
  } catch (err) {
    next(err)
  }
})

productsRouter.post('/seller/:id', async (req, res, next) => {
  try{
    console.log(req.body)
    await productService.addProduct(req.body.product, req.body.eventChoices, req.body.sizes, productsRepository, eventsRepository, db)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
    next(error)
  }

})

productsRouter.put("/:id", async (req, res, next) => {
  try{
    const { id } = req.params
    console.log("REG body",req.body.product)
    console.log("REG SIZES", req.body.sizes)
    console.log("REG EVENTS", req.body.eventChoices)
    const product = await productService.updateProduct(id, req.body.product, req.body.eventChoices, req.body.sizes, req.user, productsRepository, eventsRepository, db)
    res.send(product)
  } catch(error){
    console.log(error)
    next(error)
  }
})

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  try{
    await productService.removeProduct(id, productsRepository)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
  }
})

productsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try{
    const product = await productService.getProductById(id, productsRepository)
    res.send(product)
  } catch(error){
    next(error)
  }
})


module.exports = productsRouter