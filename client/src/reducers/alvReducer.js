const reducer = (state = "14%", action) => {
  switch (action.type) {
    case "SETALV":
      return action.new_alv
    default:
      return state
  }
}

export const setAlv = (new_alv) => {
  return async (dispatch) => {
    dispatch({ type: "SETALV", new_alv })
  }
}

export default reducer