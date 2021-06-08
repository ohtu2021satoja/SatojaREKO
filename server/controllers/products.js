const productsRouter = require("express").Router();
const productService = require("../services/products")
const productsRepository = require("../repositories/products")
const eventsRepository = require("../repositories/events")
const db = require("../db")
productsRouter.get("/", async (req, res) => {
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

productsRouter.post('/:id', async (req, res) => {
  try{
    console.log(req.body)
    await productService.addProduct(req.body.product, req.body.eventChoices, req.body.sizes, productsRepository, eventsRepository, db)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
    next(error)
  }

})


module.exports = productsRouter