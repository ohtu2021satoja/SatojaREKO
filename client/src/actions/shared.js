import { getInitialData } from "../services"
import { setAuthedUser } from "./authedUser"
import { receiveProducts } from "./products"
import { receiveUsers } from "./users"

const AUTHED_ID = null

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ products, users }) => {
    dispatch(setAuthedUser(AUTHED_ID))
    dispatch(receiveProducts(products))
    dispatch(receiveUsers(users))
  })
}
