const reducer = (state = [0], action) => {
  switch (action.type) {
    case 'CHANGEQUANTITY':
      console.log(action.index)
      console.log(action.newquantity)
      const newState = state.slice()
      newState[action.index] = action.newquantity
      return newState
    case "ADDQUANTITY":
      return state.concat(0)
    default:
      return state
  }
}



export const changeQuantity = (newquantity, index) => {
  return async dispatch => {
    dispatch({type: 'CHANGEQUANTITY', newquantity, index})
  }
  
}

export const addQuantity = () => {
  return async dispatch => {
    dispatch({type: 'ADDQUANTITY'})
  }
  
}

export default reducer