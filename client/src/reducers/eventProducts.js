import { RECEIVE_EVENT_PRODUCTS } from "../actions/eventProducts"

export const eventProducts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_PRODUCTS:
      return { ...state, [action.id]: action.products }
    default:
      return state
  }
}
