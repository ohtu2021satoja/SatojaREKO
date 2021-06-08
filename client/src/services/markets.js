import axios from "axios"

const apiUrl = "/api/markets"

const getAllMarkets = () => {
  const request = axios.get(apiUrl)
  return request.then((response) => response.data)
}

export { getAllMarkets }
