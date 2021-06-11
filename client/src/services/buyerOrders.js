import axios from "axios"

const apiUrl = "/api/orders/buyer"

export const getBuyerOrders = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export default { getBuyerOrders }
