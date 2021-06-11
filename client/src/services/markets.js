import axios from "axios"

const apiUrl = "/api/markets"

const getMarkets = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

export default { getMarkets }
