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
    if(!new_product.image_url){
      new_product.image_url = BLANK_IMAGE
    }
    for(i in new_sizes){
      new_sizes[i].batch_quantity = new_sizes[i].quantity 
      const old_size = product.sizes.filter(size => size.unit === new_sizes[i].unit)[0]
      console.log(old_size)
      if(old_size){
        const difference = new_sizes[i].quantity - old_size.batch_quantity
        new_sizes[i].quantity = old_size.quantity + difference
        new_sizes[i].id = old_size.id
      } else{
        new_sizes[i].id = null
      }
    }
    if(product.unit_price === new_product.unit_price){
      
      await productsRepository.updateProduct(product_id, new_product)

      const old_sizes = new_sizes.filter(size => size.id != null)
      await productsRepository.updateOldProductSizes(old_sizes)

      const new_product_sizes = new_sizes.filter(size => size.id === null)
      if(new_product_sizes.length > 0){
        await productsRepository.addProductSizes(product_id,new_product_sizes)
      }

      const new_units = new_sizes.map(size => size.unit)
      const removed_sizes = product.sizes.filter(size => ! new_units.includes(size.unit))
      await productsRepository.removeSizes(product_id, removed_sizes)

      const adding_events = new_event_choices.filter(event => ! product.events.includes(event))
      if(adding_events.length > 0){
        await eventsRepository.addProductToEvents(product_id, adding_events)
      }

      const events_to_remove = product.events.filter(event => ! new_event_choices.includes(event))
      if(events_to_remove.length > 0){
        await eventsRepository.removeProductFromEvents(product_id, events_to_remove)
      }


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