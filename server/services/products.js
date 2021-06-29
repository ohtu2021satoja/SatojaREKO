const BLANK_IMAGE = "profile-blank_or75kg"
const BLANK_IMAGE_MEAT = ""
const BLANK_IMAGE_BREAD_AND_BAKING = "leivat-leivonta_2x_ozueux"
const BLANK_IMAGE_DRINKS = "juomat_2x_slczgk"
const BLANK_IMAGE_EGGS = "munat_2x_zo3xnq"
const BLANK_IMAGE_VEGETABLES = "vihannekset_2x_o482nl"
const BLANK_IMAGE_OTHERS = "muut_2x_cxusjk"
const BLANK_IMAGE_FISH_AND_MEAT = "liha-kala_2x_ja6fny"
const BLANK_IMAGE_FRUIT_AND_BERRIES = "hedelmat-marjat_2x_zfyftv"
const BLANK_IMAGE_DAIRY = "maitotuotteet_zfrkwu"
const BLANK_IMAGE_HERBS_AND_SPICES = "yrtit-mausteet_yvekbb"
const BLANK_IMAGE_FOOD = "ruokaa_2x_nzvn3e"



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

const getEventProduct = async (event_id, product_id, productsRepository) => {
  const product = await productsRepository.getEventProduct(event_id, product_id)
  return(product)
}

const getProductById = async (product_id, productsRepository) => {
  const product = await productsRepository.getProductById(product_id)
  return(product)
}

const updateProduct = async (product_id, new_product, new_event_choices, new_sizes, current_user, productsRepository, eventsRepository, db) => {
  try{
    await db.beginTransaction()
    console.log(product_id)
    const product  = await productsRepository.getProductById(product_id)
    if(current_user.id != product.sellers_id){
      const error = new Error("Current user doesn't own this product")
      error.status = 400
      throw error
    }
    console.log(product.sizes)
    if(!new_product.image_url){
      if(new_product.category="Vihannekset"){
        new_product.image_url = BLANK_IMAGE_VEGETABLES
      }
      if(new_product.category="Liha & kala"){
        new_product.image_url = BLANK_IMAGE_FISH_AND_MEAT
      }
      if(new_product.category="Liha & kala"){
        new_product.image_url = BLANK_IMAGE_FISH_AND_MEAT
      }
      if(new_product.category="Munat"){
        new_product.image_url = BLANK_IMAGE_EGGS
      }
      if(new_product.category="Hedelmät & marjat"){
        new_product.image_url = BLANK_IMAGE_FRUIT_AND_BERRIES
      }
      if(new_product.category="Maitotuotteet"){
        new_product.image_url = BLANK_IMAGE_DAIRY
      }
      if(new_product.category="Leivät & leivonta"){
        new_product.image_url = BLANK_IMAGE_BREAD_AND_BAKING
      }
      if(new_product.category="Yrtit & mausteet"){
        new_product.image_url = BLANK_IMAGE_HERBS_AND_SPICES
      }
      if(new_product.category="Ruokaa"){
        new_product.image_url = BLANK_IMAGE_FOOD
      }
      if(new_product.category="Juomaa"){
        new_product.image_url = BLANK_IMAGE_DRINKS
      }
      if(new_product.category="Muut"){
        new_product.image_url = BLANK_IMAGE_OTHERS
      }

    }

    for(i in new_sizes){
      new_sizes[i].batch_quantity = new_sizes[i].quantity 
      const old_size = product.sizes.filter(size => size.unit === new_sizes[i].unit)[0]
      console.log(old_size)
      if(old_size){
        const difference = new_sizes[i].quantity - old_size.batch_quantity
        new_sizes[i].quantity = old_size.quantity + difference
        if(new_sizes[i].quantity < 0){
          const error =  new Error("Can't set batch quantity lower than what product has been ordered")
          error.status = 400
          throw error
        }
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

module.exports = { getAllProducts, getSellersProducts, addProduct, getEventProducts, getSellersEventProducts, removeProduct, updateProduct, getProductById, getEventProduct }