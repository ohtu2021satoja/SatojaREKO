import axios from "axios"

const apiUrl = "/api/orders/seller"

export const getSellerOrders = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export default { getSellerOrders }
