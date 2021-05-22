const productsRouter = require("express").Router();
const products = [
  {
    name: "Mansikka",
    organic: true,
    sellers_id: 1,
    type: "pc",
    batch_quantity: 3,
    created_at: Date.now(),
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?",
    imageUrl: "random",
  },
  {
    name: "Naudan sisäfile",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 2,
    created_at: Date.now(),
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?",
    imageUrl: "random",
  },
  {
    name: "Herne",
    organic: false,
    sellers_id: 1,
    type: "l",
    batch_quantity: 5,
    created_at: Date.now(),
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?",
    imageUrl: "random",
  },
];

productsRouter.get("/", (req, res) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    next(err)
  }
});

module.exports = productsRouter
