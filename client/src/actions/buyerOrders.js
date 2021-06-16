export const RECEIVE_BUYER_ORDERS = "RECEIVE_BUYER_ORDERS"

const receiveBuyerOrders = (orders) => {
  return {
    type: RECEIVE_BUYER_ORDERS,
    orders,
  }
}

export default { receiveBuyerOrders }
