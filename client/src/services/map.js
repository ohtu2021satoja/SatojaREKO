import axios from "axios"

const apiUrl = "/api/markets/map"

export const getMapData = async () => {
  const response = await axios.get(apiUrl)
  console.log("axios response: ", response)
  return response.data
}
