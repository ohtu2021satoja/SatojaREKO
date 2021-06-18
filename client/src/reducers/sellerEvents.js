import { RECEIVE_SELLER_EVENTS } from "../actions/sellerEvents"

export const sellerEvents = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELLER_EVENTS:
      return action.events
    default:
      return state
  }
}
