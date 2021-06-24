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

export const submitBuyerOrders = async (orders, buyerID) => {
  const response = await axios.post(`${apiUrl}/buyer/${buyerID}`, orders)
  return response
}

export default { getSellerOrders, getBuyerOrders }
