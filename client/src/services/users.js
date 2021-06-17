import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async () => {
  const response = await axios.get(`${apiUrl}/current/user`)
  return response.data
}
