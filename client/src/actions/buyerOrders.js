import { getBuyerOrders } from "../services/orders"

export const RECEIVE_BUYER_ORDERS = "RECEIVE_BUYER_ORDERS"

export const receiveBuyerOrders = (id) => {
  return async (dispatch) => {
    const events = await getBuyerOrders(id)
    for (const event of events) {
      for (const product of event.orders)
        if (product.type === "pc") {
          product.type = "kpl"
        }
    }
    dispatch({ type: "RECEIVE_BUYER_ORDERS", orders: events })
  }
}
