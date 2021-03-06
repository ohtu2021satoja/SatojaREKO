import axios from "axios"

const apiUrl = "/api/products"

export const getSellerProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}

export const DeleteProduct = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`)
  return response.data
}

export const getEventProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/events/${id}`)
  return response.data
}
export const getTestiProducts = async () => {
  const response = await axios.get(`${apiUrl}`)
  return response.data
}

const getUserProducts = (id) => {
  const request = axios.get(`${apiUrl}/${id}`)
  return request.then((response) => response.data)
}

const addProduct = async (productObject) => {
  const response = await axios.post(
    `${apiUrl}/seller/${productObject.product.sellers_id}`,
    productObject
  )
  return response
}

const updateProduct = async (product_id, productObject) => {
  const response = await axios.put(`${apiUrl}/${product_id}`, productObject)
  return response.data
}

const getProductById = async (product_id) => {
  const response = await axios.get(`${apiUrl}/${product_id}`)
  console.log(response.data)
  return response.data
}

export default {
  getUserProducts,
  getEventProducts,
  DeleteProduct,
  addProduct,
  updateProduct,
  getProductById,
  getTestiProducts,
  getSellerProducts,
}
