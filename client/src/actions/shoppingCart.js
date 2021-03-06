import { submitBuyerOrders } from "../services/orders"

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
export const SUBMIT_ORDERS = "SUBMIT_ORDERS"

export const addProductToCart = (product, size, event) => {
  return async (dispatch) => {
    // Standardize key names
    if ("size_id" in size) {
      size = { ...size, id: size.size_id }
    }
    if ("event_id" in event) {
      event = { ...event, id: event.event_id }
    }
    dispatch({ type: "ADD_PRODUCT_TO_CART", product, size, event })
  }
}

export const removeProductFromCart = (product, size, event) => {
  return async (dispatch) => {
    // Standardize key names
    if ("size_id" in size) {
      size = { ...size, id: size.size_id }
    }
    if ("event_id" in event) {
      event = { ...event, id: event.event_id }
    }
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", product, size, event })
  }
}

export const submitOrders = (orders, buyerID) => {
  return async (dispatch) => {
    console.log("SUBMITTING: ", orders)
    try {
      const res = await submitBuyerOrders(orders, buyerID)
      console.log(res)
      const success = res.status === 200
      dispatch({ type: "SUBMIT_ORDERS", success })
    } catch (e) {
      console.log(e)
    }
  }
}
