export const RECEIVE_SELLER_ORDERS = "RECEIVE_SELLER_ORDERS"

const receiveSellerOrders = (orders) => {
  return {
    type: RECEIVE_SELLER_ORDERS,
    orders,
  }
}

export default { receiveSellerOrders }
