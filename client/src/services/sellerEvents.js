import axios from "axios"

const apiUrl = "/api/events/seller"

const getSellerEvents = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export default { getSellerEvents }
