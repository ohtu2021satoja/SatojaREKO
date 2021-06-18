import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async () => {
  const response = await axios.get(`${apiUrl}/current/user`)
  return response.data
}

export const createNewUser = (user) => {
  axios.post(`${apiUrl}/current/user`, user)
}

export const updateUser = (user) => {
  axios.put(`${apiUrl}/current/user`, user)
}
