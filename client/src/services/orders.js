import axios from "axios"

const apiUrl = "/api/orders"

export const getSellerOrders = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}

export const getBuyerOrders = async (id) => {
  const response = await axios.get(`${apiUrl}/buyer/${id}`)
  return response.data
}

export default { getSellerOrders, getBuyerOrders }
