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
// export const deleteSellerProductOrder = (sellerId, orderId, sizeId) => {
//   return async (dispatch) => {
//     dispatch({ type: "DELETE_ORDER_PRODUCT", sellerId, orderId, sizeId })
//   }
// }
// export const deleteSellerOrder = (sellerId, orderId) => {
//   return async (dispatch) => {
//     dispatch({ type: "DELETE_ORDER", sellerId, orderId })
//   }
// }
