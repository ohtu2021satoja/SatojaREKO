const reducer = (state = [{ size: "0,0", quantity: 0 }], action) => {
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
        size: "0,0",
        quantity: 0,
      }
      return state.concat(newSize)

    case "REMOVELASTSIZE":
      const newstate = state
      newstate.pop()
      return newstate

    case "RESETPRODUCTSIZES":
      return [{size: "0,0", quantity: 0}]

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
    dispatch({ type: "REMOVELASTSIZE"})
  }
}

export const resetProductSizes = () => {
  return async (dispatch) => {
    dispatch({ type: "RESETPRODUCTSIZES"})
  }
}

export default reducer