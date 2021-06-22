import axios from "axios"

const baseUrl = "/api/auth"

export const createNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseUrl}/email/register`, { user_info: newUser })
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}
