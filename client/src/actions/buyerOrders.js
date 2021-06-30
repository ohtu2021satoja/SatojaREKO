import { getBuyerOrders } from "../services/orders"

export const RECEIVE_BUYER_ORDERS = "RECEIVE_BUYER_ORDERS"

export const receiveBuyerOrders = (id) => {
  return async (dispatch) => {
    const orders = await getBuyerOrders(id)
    dispatch({ type: "RECEIVE_BUYER_ORDERS", orders: orders })
  }
}
