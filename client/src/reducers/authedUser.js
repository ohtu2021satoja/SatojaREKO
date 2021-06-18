import { SET_AUTHED_USER } from "../actions/authedUser"

export const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      console.log(action.user)
      return action.user
    default:
      return state
  }
}
