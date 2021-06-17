import axios from "axios"

const baseUrl = "/api/out/logout"

export const logoutUser = () => {
  axios.get(`${baseUrl}`)
}