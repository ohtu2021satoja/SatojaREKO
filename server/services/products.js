const getAllProducts = async (productsRepository) => {
  const products = productsRepository.getAllProducts()
  return(products)
}

const getSellersProducts = async (id, productsRepository) => {
  const products = productsRepository.getSellersProducts(id)
  return(products)
}

const addProduct = async (product, eventChoices, productsRepository, eventsRepository) => {
  const product_id  = await productsRepository.addProduct(product)
  
  await eventsRepository.addProductToEvents(product_id, eventChoices)
}

module.exports = { getAllProducts, getSellersProducts, addProduct }
