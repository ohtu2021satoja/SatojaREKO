import { getEventProducts } from "../services/products"

export const RECEIVE_EVENT_PRODUCTS = "RECEIVE_EVENT_PRODUCTS"

export const receiveEventProducts = (id) => {
  return async (dispatch) => {
    const products = await getEventProducts(id)
    dispatch({ type: "RECEIVE_EVENT_PRODUCTS", products: products, id: id })
  }
}
