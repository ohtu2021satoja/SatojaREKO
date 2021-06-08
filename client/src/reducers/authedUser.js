import { SET_AUTHED_USER, LOGOUT_USER, ADD_PRODUCT_TO_CART } from "../actions/authedUser"

export const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    case LOGOUT_USER:
      return null
    case ADD_PRODUCT_TO_CART:
      return action.product
    default:
      return state
  }
}
