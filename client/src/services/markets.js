import axios from "axios"

const apiUrl = "api/markets"

const addMarket = async (address, rekoChoices) => {
  const response = await axios.post(`${apiUrl}`, {
    address,
    rekoChoices,
  })
  return response
}

const getAllMarkets = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

export const getSellerMarkets = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}

export default { getAllMarkets, getSellerMarkets, addMarket }
