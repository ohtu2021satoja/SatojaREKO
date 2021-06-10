import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_ORDERS,
} from "../actions/shoppingCart"

import { submitBuyerOrders } from "../services/orders"

export const shoppingCart = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const eventState = state[action.eventID] || { [action.sizeID]: 0 }

      const newOrderQuantity = eventState[action.sizeID]
        ? eventState[action.sizeID] + 1
        : 1

      const newCartState = {
        ...state,
        [action.eventID]: { ...eventState, [action.sizeID]: newOrderQuantity },
      }

      return newCartState
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const eventState = state[action.eventID] || { [action.sizeID]: 0 }

      const currentOrderQuantity = eventState[action.sizeID]
        ? eventState[action.sizeID]
        : 0

      const newCartState = {
        ...state,
        [action.eventID]: {
          ...eventState,
          [action.sizeID]:
            currentOrderQuantity < 1 ? currentOrderQuantity : currentOrderQuantity - 1,
        },
      }

      return newCartState
    }
    case SUBMIT_ORDERS: {
      const eventOrders = Object.keys(state).map((eventID) => {
        const eventSizes = Object.keys(state[eventID]).map((sizeID) => {
          return { size_id: sizeID, order_quantity: state[eventID][sizeID] }
        })
        return { event_id: eventID, batches: eventSizes }
      })
      const submittableOrders = { orders: eventOrders }
      console.log(submittableOrders)
      // Submit to server here

      return {}
    }
    default:
      return state
  }
}

export const addProductToCart = (product, sizeID, eventID) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", product, sizeID, eventID })
  }
}

export const removeProductFromCart = (product, sizeID, eventID) => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", product, sizeID, eventID })
  }
}

export const submitOrders = (buyerID) => {
  return async (dispatch) => {
    const res = await submitBuyerOrders(buyerID)
    console.log(res)
    dispatch({ type: "SUBMIT_ORDERS", buyerID })
  }
}
