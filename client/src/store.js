import { applyMiddleware, combineReducers, createStore } from 'redux'
import priceReducer from './reducers/priceReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    price: priceReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store