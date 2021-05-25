const reducer = (state = "00,00€", action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.newprice
    default:
      return state
  }
}



export const changePrice = (newprice) => {
  return async dispatch => {
    dispatch({type: 'CHANGE', newprice})
  }
  
}

export default reducer