const reducer = (state = { product: { type: "Valitse yksikkö" } }, action) => {
  switch (action.type) {
    case "SETPRODUCTYPE":
      const newstate = state
      newstate.product.type = action.new_type
      console.log(newstate)
      return newstate
    default:
      return state
  }
}

export const setProductType = (new_type) => {
  return async (dispatch) => {
    dispatch({ type: "SETPRODUCTYPE", new_type })
  }
}

export default reducer
