const reducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGEPRICE":
      return action.newprice
    default:
      return state
    case "RESETPRICE":
      return ""
  }
}

export const changePrice = (newprice) => {
  return async (dispatch) => {
    dispatch({ type: "CHANGEPRICE", newprice })
  }
}

export const resetPrice = () => {
  return async (dispatch) => {
    dispatch({ type: "RESETPRICE" })
  }
}

export default reducer
