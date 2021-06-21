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
import { shoppingCart } from "./shoppingCart"
import alvReducer from "./alvReducer"
import { mapPoints } from "./mapReducer"

export default combineReducers({
  alv: alvReducer,
  price: priceReducer,
  productSizes: productSizesReducer,
  eventChoices: eventChoicesReducer,
  authedUser,
  buyerOrders,
  eventProducts,
  events,
  mapPoints,
  markets,
  products,
  sellerEvents,
  sellerMarkets,
  sellerOrders,
  sellerProducts,
  shoppingCart,
})
