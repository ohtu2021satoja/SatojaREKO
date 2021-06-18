export const RECEIVE_EVENT_PRODUCTS = "RECEIVE_EVENT_PRODUCTS"

const receiveEventProducts = (products) => {
  return {
    type: RECEIVE_EVENT_PRODUCTS,
    products,
  }
}

export default { receiveEventProducts }
