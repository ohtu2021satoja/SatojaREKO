import axios from "axios"

const apiUrl = "/api/products"

export const getProducts = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}