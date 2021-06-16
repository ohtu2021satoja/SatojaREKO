import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

// TODO: add user

// TODO: delete user

export default { getAuthedUser }
