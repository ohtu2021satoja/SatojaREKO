import axios from "axios"

const apiUrl = "api/markets"

const addMarket = async (address, city, rekoChoices) => {
  console.log(address, rekoChoices)
  const response = await axios.post(`${apiUrl}/reko_market`, {
    address,
    city,
    reko_areas: rekoChoices,
  })
  console.log(response)
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
