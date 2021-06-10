export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
export const SUBMIT_ORDERS = "SUBMIT_ORDERS"

export const addProductToCart = (product, sizeID, event) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    sizeID,
    event,
  }
}

export const removeProductFromCart = (product, sizeID, event) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    product,
    sizeID,
    event,
  }
}

export const submitOrders = (buyerID) => {
  return {
    type: SUBMIT_ORDERS,
    buyerID,
  }
}
