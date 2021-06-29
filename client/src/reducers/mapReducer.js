import { RECEIVE_MAP_POINTS } from "../actions/map"

export const mapPoints = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MAP_POINTS:
      return action.data
    default:
      return state
  }
}
