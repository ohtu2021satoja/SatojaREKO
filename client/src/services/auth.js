import axios from "axios"

const baseUrl = "/api/auth"

export const createNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseUrl}/email/register`, newUser)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/email`, credentials)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
    return "error"
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
