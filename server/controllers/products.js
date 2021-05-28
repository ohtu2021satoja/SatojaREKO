const productsRouter = require("express").Router();
const productService = require("../services/products")
const productsRepository = require("../repositories/products")
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
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

productsRouter.post('/:id', async (req, res) => {
  try{
    await productService.addProduct(req.body.product, req.body.eventChoices, productsRepository, eventsRepository)
    res.send(200).end()
  } catch(error){
    next(error)
  }

})


module.exports = productsRouter
