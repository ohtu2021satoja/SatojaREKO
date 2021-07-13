const reducer = (state = [{ size: "", quantity: 0 }], action) => {
  switch (action.type) {
    case "CHANGESIZEQUANTITY":
      console.log(action.index)
      console.log(action.newquantity)
      const newQuantityState = state.slice()
      const oldSize = newQuantityState[action.index].size
      newQuantityState[action.index] = {
        size: oldSize,
        quantity: action.newquantity,
      }
      return newQuantityState
    case "CHANGESIZE":
      const newSizeState = state.slice()
      const oldQuantity = newSizeState[action.index].quantity
      newSizeState[action.index] = {
        size: action.newsize,
        quantity: oldQuantity,
      }
      return newSizeState
    case "ADDNEWSIZE":
      const newSize = {
        size: "",
        quantity: 0,
      }
      return state.concat(newSize)

    case "REMOVELASTSIZE":
      const newstate = state
      newstate.pop()
      return newstate

    case "RESETPRODUCTSIZES":
      console.log(action.sizes)
      return [{ size: "", quantity: 0 }]

    case "INITIALIZESIZES":
      return action.sizes.map((size) => ({
        size: String(size.unit),
        quantity: size.batch_quantity,
      }))

    default:
      return state
  }
}

export const changeQuantity = (newquantity, index) => {
  return async (dispatch) => {
    dispatch({ type: "CHANGESIZEQUANTITY", newquantity, index })
  }
}

export const changeSize = (newsize, index) => {
  return async (dispatch) => {
    dispatch({ type: "CHANGESIZE", newsize, index })
  }
}

export const addQuantity = () => {
  return async (dispatch) => {
    dispatch({ type: "ADDNEWSIZE" })
  }
}

export const removeQuantity = () => {
  return async (dispatch) => {
    dispatch({ type: "REMOVELASTSIZE" })
  }
}

export const resetProductSizes = () => {
  return async (dispatch) => {
    dispatch({ type: "RESETPRODUCTSIZES" })
  }
}

export const initializeSizes = (sizes) => {
  console.log(sizes)
  return async (dispatch) => {
    dispatch({ type: "INITIALIZESIZES", sizes })
  }
}

export default reducer
