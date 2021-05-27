const reducer = (state = "00,00€", action) => {
  switch (action.type) {
    case 'CHANGEPRICE':
      return action.newprice
    default:
      return state
  }
}



export const changePrice = (newprice) => {
  return async dispatch => {
    dispatch({type: 'CHANGEPRICE', newprice})
  }
  
}

export default reducer