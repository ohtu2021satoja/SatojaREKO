const db = require("../db")

const getAllProducts = async () => {
  const products = await db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id GROUP BY products.id",)
  return(products)
}

const getSellersProducts = async (id) => {
  const products = await  db.query("SELECT * FROM products WHERE sellers_id=$1",[id])
  return(products)
}

const getSellersProductsFilteredByCategory = async (id, category) => {
  const products = await  db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id WHERE products.sellers_id=$1 AND products.category=$2  GROUP BY products.id",[id, category])
  return(products)
}

const getProductsFilteredByCategory = async (category) => {
  const products = await  db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id WHERE products.category=$1 GROUP BY products.id ",[category])
  return(products)
}

const addProduct = async (product) => {
  const dbParams = [product.name, product.unit_price, product.organic, product.sellers_id, product.category, product.type,  product.batch_quantity, product.description, product.deleteBeforeEvent, product.vat, product.imageURL]
  const result= await db.query("INSERT INTO products VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, DEFAULT, $8, $9, $10, $11) RETURNING id", dbParams)
  return(result[0].id)
}

const addProductSizes = async (product_id, sizes) => {
  sizes.forEach(size => {
    db.query("INSERT INTO sizes VALUES($1, $2, $3, DEFAULT)", [product_id, size.quantity, size.unit])
  });
}

module.exports = { getAllProducts, getSellersProducts, addProduct, addProductSizes, getSellersProductsFilteredByCategory, getProductsFilteredByCategory }

