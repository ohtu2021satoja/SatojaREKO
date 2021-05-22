const productsRouter = require("express").Router();
const db = require("../services/db")

productsRouter.get("/", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products",);
    res.status(200).json(products);
  } catch (err) {
    next(err)
  }
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const products = await  db.query("SELECT * FROM products WHERE sellers_id=$1",[id]);
  if (!products) {
    return res.status(404).send({ error: 'User products not found' });
  }
  try {
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})


module.exports = productsRouter
