import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_ORDERS,
} from "../actions/shoppingCart"

import { submitBuyerOrders } from "../services/orders"

export const shoppingCart = (
  state = { orders: {}, products: {}, events: {} },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const orderState = state.orders[action.event.id] || {
        [action.sizeID]: 0,
      }

      const newOrderQuantity = orderState[action.sizeID]
        ? orderState[action.sizeID] + 1
        : 1

      const newCartState = {
        orders: {
          ...state.orders,
          [action.event.id]: {
            ...orderState,
            [action.sizeID]: newOrderQuantity,
          },
        },
        products: { ...state.products, [action.sizeID]: action.product },
        events: { ...state.events, [action.event.id]: action.event },
      }
      return newCartState
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const orderState = state.orders[action.event.id] || { [action.sizeID]: 0 }

      const currentOrderQuantity = orderState[action.sizeID]
        ? orderState[action.sizeID]
        : 0

      const newOrderQuantity =
        currentOrderQuantity < 1 ? currentOrderQuantity : currentOrderQuantity - 1

      const newCartState = {
        orders:
          newOrderQuantity === 0
            ? (() => {
                const { [action.sizeID]: omit, ...rest } = orderState
                if (Object.keys(rest).length > 0) {
                  return {
                    ...state.orders,
                    [action.event.id]: rest,
                  }
                } else {
                  const { [action.event.id]: omit, ...rest } = state.orders
                  return rest
                }
              })()
            : {
                ...state.orders,
                [action.event.id]: {
                  ...orderState,
                  [action.sizeID]: newOrderQuantity,
                },
              },
        products: (() => {
          if (newOrderQuantity === 0) {
            const lastSize = (() => {
              let isLast = true
              Object.keys(state.orders).forEach((eventID) => {
                if (
                  action.sizeID in state.orders[eventID] &&
                  eventID !== action.event.id.toString()
                )
                  isLast = false
              })
              return isLast
            })()
            if (lastSize) {
              const { [action.sizeID]: omit, ...rest } = state.products
              return rest
            }
          }
          return state.products
        })(),
        events: (() => {
          if (newOrderQuantity === 0) {
            if (Object.keys(state.products).length === 1) {
              const { [action.event.id]: omit, ...rest } = state.events
              return rest
            }
          }
          return state.events
        })(),
      }

      return newCartState
    }
    case SUBMIT_ORDERS: {
      if (action.success) return { orders: {}, products: {}, events: {} }
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
    const res = await submitBuyerOrders(orders, buyerID)
    console.log(res)
    const success = res.status === 200 ? true : false
    dispatch({ type: "SUBMIT_ORDERS", success })
  }
}
