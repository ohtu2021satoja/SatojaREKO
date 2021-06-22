import axios from "axios"
const apiUrl = "/api/auth/email"

export const ResetPassword = async (email, password) => {
  const response = await axios.post(`${apiUrl}/reset_password`, {
    email,
    password,
  })
  return response
}

export default { ResetPassword }
