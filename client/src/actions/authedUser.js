export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export const logoutUser = (id) => {
  return {
    type: LOGOUT_USER,
    id,
  }
}
