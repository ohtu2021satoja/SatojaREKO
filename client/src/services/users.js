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

export const updateAuthedUser = async (user) => {
  try {
    const response = await axios.put(`${apiUrl}/${user.id}`, user)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export const updateSellerImage = async (id, url) => {
  try {
    const response = await axios.put(`/api/sellers/${id}/image`, url)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export const updateBuyerImage = async (id, url) => {
  try {
    const response = await axios.put(`/api/buyers/${id}/image`, url)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}
