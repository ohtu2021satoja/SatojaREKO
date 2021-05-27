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

productsRouter.post('/:id', async (req, res) => {
  const { id } = req.params
  console.log(req.body)
  const product = req.body.product
  const dbParams = [product.name, product.organic, product.sellers_id, product.type, product.batch_quantity, product.description, product.imageURL, product.category]
  const result= await db.query("INSERT INTO products VALUES(DEFAULT, $1, $2, $3, $4, $5, DEFAULT, $6, $7, $8) RETURNING id", dbParams)
  const product_id = result[0].id
  req.body.eventChoices.forEach(eventChoice => {
    db.query("INSERT INTO products_events VALUES ($1,$2)", [product_id, eventChoice])
  });
})


module.exports = productsRouter
