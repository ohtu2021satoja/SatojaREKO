import axios from "axios"

const apiUrl = "/api/markets/seller"

export const getSellerMarkets = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export default { getSellerMarkets }
