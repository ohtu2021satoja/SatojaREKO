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

export const DeleteOrder = async (order_Id, seller_Id) => {
  const response = await axios.delete(`${apiUrl}/seller/${seller_Id}/${order_Id}`)
  return response.data
}

export const DeleteProductOrder = async (order_Id, seller_Id, size_Id) => {
  const response = await axios.delete(
    `${apiUrl}/seller/${seller_Id}/${order_Id}/${size_Id}`
  )
  return response.data
}

export default { getSellerOrders, getBuyerOrders }
