import { RECEIVE_EVENT_PRODUCTS } from "../actions/eventProducts"

export const eventProducts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENT_PRODUCTS:
      return action.products
    default:
      return state
  }
}
