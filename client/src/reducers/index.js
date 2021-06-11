import { combineReducers } from "redux"
import { authedUser } from "./authedUser"
import { buyerOrders } from "./buyerOrders"
import { eventProducts } from "./eventProducts"
import { events } from "./events"
import { markets } from "./markets"
import { products } from "./products"
import { sellerEvents } from "./sellerEvents"
import { sellerMarkets } from "./sellerMarkets"
import { sellerOrders } from "./sellerOrders"
import { sellerProducts } from "./sellerProducts"
import priceReducer from "./priceReducer"
import productSizesReducer from "./productSizesReducer"
import eventChoicesReducer from "./eventChoicesReducer"

export default combineReducers({
  price: priceReducer,
  productSizes: productSizesReducer,
  eventChoices: eventChoicesReducer,
  authedUser,
  buyerOrders,
  eventProducts,
  events,
  markets,
  products,
  sellerEvents,
  sellerMarkets,
  sellerOrders,
  sellerProducts,
})
