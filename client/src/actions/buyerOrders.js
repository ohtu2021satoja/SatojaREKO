import { getBuyerOrders } from "../services/orders"

export const RECEIVE_BUYER_ORDERS = "RECEIVE_BUYER_ORDERS"

export const receiveBuyerOrders = (id) => {
  return async (dispatch) => {
    const orders = await getBuyerOrders(id)
    for (const order of orders) {
      for (const product of order.products)
        if (product.type === "pc") {
          product.type = "kpl"
        }
    }
    dispatch({ type: "RECEIVE_BUYER_ORDERS", orders: orders })
  }
}
