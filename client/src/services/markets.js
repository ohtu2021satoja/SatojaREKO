import axios from "axios"

const apiUrl = "api/markets"

const addMarket = async (address, rekoChoices) => {
  const response = await axios.post(`${apiUrl}`, {
    address,
    rekoChoices,
  })
  return response
}

const getAllMarkets = () => {
  const request = axios.get(apiUrl)
  return request.then((response) => response.data)
}

export default { getAllMarkets, addMarket }
