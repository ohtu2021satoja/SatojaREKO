import { RECEIVE_SELLER_ORDERS } from "../actions/sellerOrders"

export const sellerOrders = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELLER_ORDERS:
      return action.orders
    default:
      return state
  }
}
