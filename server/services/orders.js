const db = require("../db")

const addBuyersOrders = async (buyer_id, orders, ordersRepository, productsRepository) => {
  try{
    await db.beginTransaction()
    for(const order_index in orders){
      order = orders[order_index]
      const order_id = await ordersRepository.addOrder(buyer_id, order.event_id)
      console.log(order_id)
      const batches = order.batches
      for(const batch_index in batches){
        const batch = batches[batch_index]
        await productsRepository.updateSizeQuantity(batch.size_id, batch.order_quantity)
        await ordersRepository.addBatch(order_id, batch.size_id, batch.order_quantity)
      }
    }
    await db.endTransaction()
  } catch (e) {
    await db.rollBack()
    console.log(e)
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

module.exports = { addBuyersOrders, getSellersOrders, getBuyersOrders }