import { applyMiddleware, combineReducers, createStore } from 'redux'
import priceReducer from './reducers/priceReducer'
import productSizesReducer from "./reducers/productSizesReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    price: priceReducer,
    productSizes: productSizesReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store