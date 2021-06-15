import axios from "axios"

const apiUrl = "/api/markets"

const getAllMarkets = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

export const getSellerMarkets = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}

export default { getAllMarkets, getSellerMarkets }

