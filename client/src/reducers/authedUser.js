import {
  SET_AUTHED_USER,
  LOGOUT_USER,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/authedUser"

export const authedUser = (state = { user: null, cart: {} }, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    case LOGOUT_USER:
      return null
    case ADD_PRODUCT_TO_CART: {
      const productID = action.product.id
      const itemAmount = state.cart[productID] || 0
      const newCartState = { ...state.cart, [productID]: itemAmount + 1 }
      return { ...state, cart: newCartState }
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const productID = action.product.id
      const itemAmount = state.cart[productID] || 0
      const newCartState = {
        ...state.cart,
        [productID]: itemAmount < 1 ? 0 : itemAmount - 1,
      }
      return { ...state, cart: newCartState }
    }
    default:
      return state
  }
}

export const addProductToCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", product })
  }
}

export const removeProductFromCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", product })
  }
}
