import { getProducts } from "./products"
import { getUsers } from "./users"

export const getInitialData = () => {
  return Promise.all([getProducts(), getUsers()])
    .then(([products, users]) => ({
      products,
      users,
    }))
    .catch((error) => {
      console.error(error.message)
    })
}
