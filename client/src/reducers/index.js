import { combineReducers } from "redux"
import { authedUser } from "./authedUser"
import { products } from "./products"
import { events } from "./events"
import priceReducer from "./priceReducer"
import productSizesReducer from "./productSizesReducer"
import eventChoicesReducer from "./eventChoicesReducer"
import currentProduct from "./currentProduct"
import { shoppingCart } from "./shoppingCart"
import alvReducer from "./alvReducer"

export default combineReducers({
  currentProduct: currentProduct,
  alv: alvReducer,
  price: priceReducer,
  productSizes: productSizesReducer,
  eventChoices: eventChoicesReducer,
  authedUser,
  products,
  events,
  shoppingCart,
})
