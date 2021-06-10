import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_ORDERS,
} from "../actions/shoppingCart"

import { submitBuyerOrders } from "../services/orders"

export const shoppingCart = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      if (state.filter((order) => order.event_id === action.event.id).length === 0) {
        return state.concat({
          event_id: action.event.id,
          event: action.event,
          batches: [
            {
              size_id: action.size.id,
              order_quantity: 1,
              product: action.product,
              unit: action.size.unit,
            },
          ],
        })
      }

      const newOrdersState = state.map((order) => {
        if (order.event_id === action.event.id) {
          if (
            order.batches.filter((batch) => batch.size_id === action.size.id).length === 0
          ) {
            //console.log("new size found")
            return {
              ...order,
              batches: order.batches.concat({
                size_id: action.size.id,
                order_quantity: 1,
                product: action.product,
                unit: action.size.unit,
              }),
            }
          } else {
            const newBatchesState = order.batches.map((batch) => {
              if (batch.size_id === action.size.id) {
                //console.log("existing size found")
                return { ...batch, order_quantity: batch.order_quantity + 1 }
              }
              return batch
            })
            return { ...order, batches: newBatchesState }
          }
        }
        return order
      })
      return newOrdersState
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const currentOrder = state.find((order) => order.event_id === action.event.id)
      if (currentOrder) {
        if (currentOrder.batches.find((batch) => batch.size_id === action.size.id)) {
          const newOrdersState = state.map((order) => {
            if (order.event_id === action.event.id) {
              const newBatchesState = order.batches.map((batch) => {
                if (batch.size_id === action.size.id) {
                  const newQuantity =
                    batch.order_quantity < 1
                      ? batch.order_quantity
                      : batch.order_quantity - 1
                  return { ...batch, order_quantity: newQuantity }
                }
                return batch
              })
              return { ...order, batches: newBatchesState }
            }
            return order
          })
          return newOrdersState
        }
      }
      return state
    }
    case SUBMIT_ORDERS: {
      if (action.success) return []
      else return state
    }
    default:
      return state
  }
}

export const addProductToCart = (product, size, event) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", product, size, event })
  }
}

export const removeProductFromCart = (product, size, event) => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", product, size, event })
  }
}

export const submitOrders = (orders, buyerID) => {
  return async (dispatch) => {
    console.log("SUBMITTING: ")
    console.log(orders)
    const res = await submitBuyerOrders(orders, buyerID)
    console.log(res)
    const success = res.status === 200 ? true : false
    dispatch({ type: "SUBMIT_ORDERS", success })
  }
}
