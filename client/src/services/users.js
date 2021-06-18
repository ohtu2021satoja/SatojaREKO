import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async () => {
  const response = await axios.get(`${apiUrl}/current/user`)
  return response.data
}

export const createNewUser = (newUser) => {
  axios.post("/api/auth/email/register", { user_info: newUser })
}

export const createNewFacebookUser = (newUser) => {
  axios.post(`${apiUrl}`, newUser)
}
