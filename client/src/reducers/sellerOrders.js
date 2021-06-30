import { RECEIVE_SELLER_ORDERS } from "../actions/sellerOrders"

export const sellerOrders = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELLER_ORDERS:
      return action.orders
    default:
      return state
  }
}

export const getSellerOrders = (orders) => {
  return async (dispatch) => {
    dispatch({ type: "RECEIVE_SELLER_ORDERS", orders })
  }
}
