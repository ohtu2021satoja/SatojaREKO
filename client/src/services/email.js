import axios from "axios"
const apiUrl = "/api/auth/email"

export const ResetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/reset_password`, {
      email,
      password,
    })
    return response.data
  } catch (err) {
    console.log(err)
    return "error"
  }
}

export default { ResetPassword }
