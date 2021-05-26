import { applyMiddleware, combineReducers, createStore } from 'redux'
import priceReducer from './reducers/priceReducer'
import quantitiesReducer from "./reducers/quantitiesReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    price: priceReducer,
    quantities: quantitiesReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store