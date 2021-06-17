const db = require("../db")

const addBuyersOrders = async (buyer_id, orders, ordersRepository, productsRepository) => {
  try{
    await db.beginTransaction()
    for(const order_index in orders){
      order = orders[order_index]
      const order_id = await ordersRepository.addOrder(buyer_id, order.event_id)
      console.log(order_id)
      const batches = order.batches.map(batch => [order_id, batch.size_id, batch.order_quantity, false])
      await ordersRepository.addBatches(batches)
      await productsRepository.removeQuantitiesFromSizes(order_id)
    }
    await db.endTransaction()
  } catch (e) {
    await db.rollBack()
    console.log(e.message)
    if(e.message === 'new row for relation "sizes" violates check constraint "non_negative_quantity"'){
      e.status = 400
      e.message = "Trying to order too much of some product"
    }
    throw e
  }
}

const getSellersOrders = async (sellers_id, ordersRepository) => {
  const orders = await ordersRepository.getSellersOrders(sellers_id)
  return(orders)
}

const getBuyersOrders = async (buyers_id, ordersRepository) => {
  const orders = await ordersRepository.getBuyersOrders(buyers_id)
  return(orders)
}

const removeSellersOrder = async (seller_id, order_id, ordersRepository, productsRepository) => {
  await productsRepository.addQuantitiesToSizes(order_id, seller_id)
  await ordersRepository.removeSellersOrder(seller_id, order_id)
}

module.exports = { addBuyersOrders, getSellersOrders, getBuyersOrders, removeSellersOrder }
