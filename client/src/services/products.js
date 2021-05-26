import axios from "axios"

const apiUrl = "/api/products"

const getUserProducts = (id) => {
  const request = axios.get(`${apiUrl}/${id}`)
  return request.then((response) => response.data)
}

const getProducts = () => {
  const request = axios.get(`${apiUrl}`)
  return request.then((response) => response.data)
}

const addProduct = async (product) => {
  const response = await axios.post(`${apiUrl}/${product.sellers_id}`, product)
  return response
}

export default { getUserProducts, getProducts, addProduct }
