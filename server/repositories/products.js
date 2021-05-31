const db = require("../db")

const getAllProducts = async () => {
  const products = await db.query("SELECT * FROM products",)
  return(products)
}

const getSellersProducts = async (id) => {
  const products = await  db.query("SELECT * FROM products WHERE sellers_id=$1",[id])
  return(products)
}

const addProduct = async (product) => {
  const dbParams = [product.name, product.organic, product.sellers_id, product.type, product.batch_quantity, product.description, product.imageURL, product.category, product.deleteBeforeEvent]
  const result= await db.query("INSERT INTO products VALUES(DEFAULT, $1, $2, $3, $4, $5, DEFAULT, $6, $7, $8, $9) RETURNING id", dbParams)
  return(result[0].id)
}

const addProductSizes = async (product_id, sizes) => {
  sizes.forEach(size => {
    db.query("INSERT INTO sizes VALUES($1, $2, $3, $4, DEFAULT)", [product_id, size.price, size.quantity, size.unit])
  });
}

module.exports = { getAllProducts, getSellersProducts, addProduct, addProductSizes }

