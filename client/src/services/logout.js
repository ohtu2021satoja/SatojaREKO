import axios from "axios"

const baseUrl = "/api/auth/logout"

export const logoutUser = () => {
  axios.get(`${baseUrl}`)
}
