export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"

export const receiveProducts = (products) => {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  }
}
