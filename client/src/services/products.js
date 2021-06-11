import axios from "axios"

const apiUrl = "/api/products"

export const getSellerProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}

// TODO: add product

// TODO: delete product

// TODO: update product

export const getEventProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/events/${id}`)
  return response.data
}

const getUserProducts = (id) => {
  const request = axios.get(`${apiUrl}/${id}`)
  return request.then((response) => response.data)
}

const addProduct = async (productObject) => {
  const response = await axios.post(
    `${apiUrl}/${productObject.product.sellers_id}`,
    productObject
  )
  return response
}

export default { getSellerProducts, getEventProducts, getUserProducts, addProduct }
