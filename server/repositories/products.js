const db = require("../db")
const format = require("pg-format")

const getAllProducts = async () => {
  const products = await db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'batch_quantity', sizes.batch_quantity)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id GROUP BY products.id",)
  return(products)
}

const getProductById = async (id) => {
  const product = await db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'batch_quantity', sizes.batch_quantity, 'id', sizes.id)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id  WHERE products.id= $1 GROUP BY products.id",[id])
  console.log(product)
  return(product[0])
}

const getSellersProducts = async (id) => {
  const products = await  db.query("SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'size_id', sizes.id)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id WHERE sellers_id=$1 GROUP BY products.id",[id])
  return(products)
}

const addProduct = async (product) => {
  const dbParams = [product.name, product.unit_price, product.organic, product.sellers_id, product.category, product.type,  product.batch_quantity, product.description, product.deleteBeforeEvent, product.vat, product.imageURL]
  const result= await db.query("INSERT INTO products VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, DEFAULT, $8, $9, $10, $11) RETURNING id", dbParams)
  return(result[0].id)
}

const addProductSizes = async (product_id, sizes) => { 
  const values = sizes.map(size => [product_id, size.quantity, size.unit, size.quantity])
  const query = format("INSERT INTO sizes (product_id, quantity, unit, batch_quantity) VALUES %L", values)
  await db.query(query, [])
}

const getEventProducts = async (event_id) => {
  const products = await  db.query("SELECT sellers.name AS seller_name, products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'size_id', sizes.id)) AS sizes FROM products_events INNER JOIN products ON products_events.id_product = products.id INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN sellers ON sellers.id = products.sellers_id WHERE products_events.id_event=$1 GROUP BY (products.id, sellers.name)",[event_id])
  return(products)
}

const getSellersEventProducts = async (event_id, sellers_id) => {
  const products = await  db.query("SELECT sellers.name AS seller_name, products.id, products.name, products.organic, products.sellers_id, products.type, products.batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price)) AS sizes FROM products_events INNER JOIN products ON products_events.id_product = products.id INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN sellers ON sellers.id = products.sellers_id WHERE products_events.id_event=$1 AND products.sellers_id=$2 GROUP BY (products.id, sellers.name)",[event_id, sellers_id])
  return(products)
}

const removeQuantitiesFromSizes = async (order_id) => {
  await db.query("UPDATE sizes SET quantity=sizes.quantity-batches.quantity FROM batches WHERE sizes.id = batches.sizes_id AND batches.order_id=$1",[order_id])
}

const removeProduct = async (products_id) => {
  await db.query("UPDATE products SET removed=true WHERE id=$1", [products_id])
}

const removeProductBatches = async (products_id) => {
  await db.query("UPDATE batches SET removed=true WHERE sizes_id IN (SELECT sizes.id from sizes WHERE sizes.product_id = $1);", [products_id])
}

const addQuantitiesToSizes = async (order_id, sellers_id) => {
  await db.query("UPDATE sizes set quantity=sizes.quantity+batches.quantity from batches, products WHERE batches.order_id=$1 AND batches.sizes_id=sizes.id AND sizes.product_id = products.id AND products.sellers_id=$2;", [order_id, sellers_id])
}

const updateOldPricedProduct = async (product_id) => {
  db.query("UPDATE sizes SET quantity=0, batch_quantity=sizes.quantity WHERE sizes.product_id=$1", [product_id])
}

const updateProduct = async (product_id, new_product) => {
  db.query("UPDATE products SET name=$1, category=$2, type=$3, description=$4, close_before_event=$5, vat=$6, image_url=$7 WHERE id=$8", [new_product.name, new_product.category, new_product.type, new_product.description, new_product.close_before_event, new_product.vat, new_product.image_url, product_id])
}

const updateProductSizes = async (new_sizes) => {
  new_sizes.forEach((size) => {
    db.query("UPDATE sizes SET unit=$1, quantity=$2, batch_quantity=$3 WHERE id=$4", [size.unit, size.quantity, size.batch_quantity, size.id])
    if(size.is_different){
      db.query("UPDATE batches SET removed=true WHERE batches.sizes_id=$1", [size.id])
    }
  })
}

module.exports = { getAllProducts, getSellersProducts, addProduct, addProductSizes, getEventProducts, removeQuantitiesFromSizes, getSellersEventProducts, removeProduct, removeProductBatches, addQuantitiesToSizes, getProductById, updateOldPricedProduct, updateProduct, updateProductSizes }