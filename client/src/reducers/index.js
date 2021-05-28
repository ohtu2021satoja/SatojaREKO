import { combineReducers } from "redux"
import { authedUser } from "./authedUser"
import { products } from "./products"
import { users } from "./users"

export default combineReducers({
  authedUser,
  products,
  users,
})
