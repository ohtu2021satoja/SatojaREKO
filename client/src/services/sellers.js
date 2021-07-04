import axios from "axios"

const apiUrl = "/api/sellers"

export const getSeller = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}
