import { RECEIVE_EVENT_PRODUCTS } from "../actions/eventProducts"

export const eventProducts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_PRODUCTS:
      console.log("REDUCER")
      console.log(action.id)
      console.log(action.products)
      return { ...state, [action.id]: action.products }
    default:
      return state
  }
}
