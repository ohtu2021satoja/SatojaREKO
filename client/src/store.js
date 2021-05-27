import { applyMiddleware, combineReducers, createStore } from "redux"
import priceReducer from "./reducers/priceReducer"
import productSizesReducer from "./reducers/productSizesReducer"
import eventChoicesReducer from "./reducers/eventChoicesReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const reducer = combineReducers({
  price: priceReducer,
  productSizes: productSizesReducer,
  eventChoices: eventChoicesReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
