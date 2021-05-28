/*import axios from "axios"

const apiUrl = "/api/products"

export const getProducts = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}
*/

const products = [
  {
    id: 1,
    category: "fruit",
    type: "strawberry",
  },
  {
    id: 2,
    category: "fruit",
    type: "blueberry",
  },
  {
    id: 3,
    category: "mushrooms",
    type: "shitake",
  },
]

export const getProducts = () => {
  return products
}
