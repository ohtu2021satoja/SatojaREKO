const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADDID":
      return state.concat(action.id)
    case "DELETEID":
      return state.filter((eventID) => {
        return eventID !== action.id
      })
    case "ADDNEWSIZE":
    default:
      return state
  }
}

export const addID = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ADDID", id })
  }
}

export const deleteID = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETEID", id })
  }
}

export default reducer
