const db = require("../db")

const getAllProducts = async (productsRepository) => {
  const products = productsRepository.getAllProducts()
  return(products)
}

const getSellersProducts = async (id, productsRepository) => {
  const products = productsRepository.getSellersProducts(id)
  return(products)
}

const addProduct = async (product, eventChoices, sizes, productsRepository, eventsRepository) => {
  try{
    await db.beginTransaction()
    const product_id  = await productsRepository.addProduct(product)
    await productsRepository.addProductSizes(product_id, sizes)
    await eventsRepository.addProductToEvents(product_id, eventChoices)
    await db.endTransaction()
  } catch(e) {
    await db.rollBack()
    console.log(e)
    throw e
  }

}

const getEventProducts = async (id, productsRepository) => {
  const products = await productsRepository.getEventProducts(id)
  return(products)
}

const getSellersEventProducts = async (event_id, sellers_id, productsRepository) => {
  const products = await productsRepository.getSellersEventProducts(event_id, sellers_id)
  return(products)
}

module.exports = { getAllProducts, getSellersProducts, addProduct, getEventProducts, getSellersEventProducts }
