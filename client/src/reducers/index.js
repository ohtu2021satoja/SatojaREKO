import { combineReducers } from "redux"
import { authedUser } from "./authedUser"
import { products } from "./products"
import { events } from "./events"
import priceReducer from "./priceReducer"
import productSizesReducer from "./productSizesReducer"
import eventChoicesReducer from "./eventChoicesReducer"

export default combineReducers({
  price: priceReducer,
  productSizes: productSizesReducer,
  eventChoices: eventChoicesReducer,
  authedUser,
  products,
  events,
})
