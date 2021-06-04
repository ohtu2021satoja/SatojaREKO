import { RECEIVE_EVENTS } from "../actions/events"

export const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events
    default:
      return state
  }
}
