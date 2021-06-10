import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_ORDERS,
} from "../actions/shoppingCart"

//import { submitBuyerOrders } from "../services/orders"

export const shoppingCart = (state = [{}, {}, {}], action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const eventState = state[0][action.event.id] || {
        [action.sizeID]: 0,
      }

      const newOrderQuantity = eventState[action.sizeID]
        ? eventState[action.sizeID] + 1
        : 1

      const newCartState = [
        {
          ...state[0],
          [action.event.id]: {
            ...eventState,
            [action.sizeID]: newOrderQuantity,
          },
        },
        { ...state[1], [action.sizeID]: action.product },
        { ...state[2], [action.event.id]: action.event },
      ]

      return newCartState
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const eventState = state[0][action.event.id] || { [action.sizeID]: 0 }

      const currentOrderQuantity = eventState[action.sizeID]
        ? eventState[action.sizeID]
        : 0

      const newOrderQuantity =
        currentOrderQuantity < 1 ? currentOrderQuantity : currentOrderQuantity - 1

      const newCartState = [
        {
          ...state[0],
          [action.event.id]: {
            ...eventState,
            [action.sizeID]: newOrderQuantity,
          },
        },
        {
          ...state[1],
          [action.sizeID]: newOrderQuantity === 0 ? {} : state[1][action.sizeID],
        },
        {
          ...state[2],
          [action.event.id]: newOrderQuantity === 0 ? {} : state[2][action.event.id],
        },
      ]

      return newCartState
    }
    case SUBMIT_ORDERS: {
      if (action.success) return [{}, {}, {}]
      else return state
    }
    default:
      return state
  }
}

export const addProductToCart = (product, sizeID, event) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", product, sizeID, event })
  }
}

export const removeProductFromCart = (product, sizeID, event) => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", product, sizeID, event })
  }
}

export const submitOrders = (orders, buyerID) => {
  return async (dispatch) => {
    //const res = await submitBuyerOrders(orders, buyerID)
    const success = true
    dispatch({ type: "SUBMIT_ORDERS", success })
  }
}
