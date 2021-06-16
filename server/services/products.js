const BLANK_IMAGE = "profile-blank_or75kg"

const getAllProducts = async (productsRepository) => {
  const products = productsRepository.getAllProducts()
  return(products)
}

const getSellersProducts = async (id, productsRepository) => {
  const products = productsRepository.getSellersProducts(id)
  return(products)
}

const addProduct = async (product, eventChoices, sizes, productsRepository, eventsRepository, db) => {
  try{
    await db.beginTransaction()
    if(!product.imageURL){
      product.imageURL = BLANK_IMAGE
    }
    const product_id  = await productsRepository.addProduct(product)
    await productsRepository.addProductSizes(product_id, sizes)
    await eventsRepository.addProductToEvents(product_id, eventChoices)
    await db.endTransaction()
  } catch(e) {
    console.log(e)
    await db.rollBack()
    throw e
  }
}

const getProductById = async (product_id, productsRepository) => {
  const product = await productsRepository.getProductById(product_id)
  return(product)
}

const updateProduct = async (product_id, new_product, new_event_choices, new_sizes, productsRepository, eventsRepository, db) => {
  try{
    await db.beginTransaction()
    console.log(product_id)
    const product  = await productsRepository.getProductById(product_id)
    console.log(product.sizes)
    if(!new_product.imageURL){
      new_product.imageURL = BLANK_IMAGE
    }
    for(i in new_sizes){
      const difference = new_sizes[i].quantity - product.sizes[i].batch_quantity
      new_sizes[i].batch_quantity = new_sizes[i].quantity 
      new_sizes[i].quantity = product.sizes[i].quantity + difference
      new_sizes[i].id = product.sizes[i].id
      new_sizes[i].is_different = product.sizes[i].unit - new_sizes[i].unit === 0 ? false : true
    }

    if(product.unit_price === new_product.unit_price){
      await productsRepository.updateProduct(product_id, new_product) 
      await productsRepository.updateProductSizes(new_sizes)
    } else{
      await addProduct(new_product, new_event_choices, new_sizes, productsRepository, eventsRepository, db)
      await productsRepository.updateOldPricedProduct(product.id)
    }

    await db.endTransaction()
    return(new_sizes)
  } catch(e) {
    console.log(e)
    await db.rollBack()
    throw e
  }
}

const removeProduct = async (product_id, productsRepository) => {
  await productsRepository.removeProduct(product_id)
  await productsRepository.removeProductBatches(product_id)
}

const getEventProducts = async (id, productsRepository) => {
  const products = await productsRepository.getEventProducts(id)
  return(products)
}

const getSellersEventProducts = async (event_id, sellers_id, productsRepository) => {
  const products = await productsRepository.getSellersEventProducts(event_id, sellers_id)
  return(products)
}

module.exports = { getAllProducts, getSellersProducts, addProduct, getEventProducts, getSellersEventProducts, removeProduct, updateProduct, getProductById }