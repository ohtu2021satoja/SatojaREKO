import { RECEIVE_PRODUCTS } from "../actions/products"

export const products = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products
    default:
      return state
  }
}
