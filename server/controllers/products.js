const productsRouter = require("express").Router();
const productService = require("../services/products")
const productsRepository = require("../repositories/products")
const eventsRepository = require("../repositories/events")
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts(productsRepository)
    res.status(200).json(products);
  } catch (err) {
    console.log(err)
    next(err)
  }
});

productsRouter.get('/:id', async (req, res) => {
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

productsRouter.get('/seller/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const products = await productService.getSellersProductsFilteredByCategory(id, category, productsRepository)
  if (!products) {
    return res.status(404).send({ error: 'Sellers products not found' });
  }
  try {
    res.send(products)
  } catch (err) {
    next(err)
  }
})

productsRouter.get('/category/:category', async (req, res) => {
  const { category } = req.params
  const products = await productService.getProductsFilteredByCategory(category, productsRepository)
  if (!products) {
    return res.status(404).send({ error: 'Products not found' });
  }
  try {
    res.send(products)
  } catch (err) {
    next(err)
  }

})

productsRouter.post('/:id', async (req, res) => {
  try{
    await productService.addProduct(req.body.product, req.body.eventChoices, req.body.sizes, productsRepository, eventsRepository)
    res.sendStatus(200).end()
  } catch(error){
    console.log(error)
    next(error)
  }

})


module.exports = productsRouter
