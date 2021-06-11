import axios from "axios"

const apiUrl = "/api/products/events"

export const getEventProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export default { getEventProducts }
