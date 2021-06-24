import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/current/user`)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export const createNewFacebookUser = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}`, newUser)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}
