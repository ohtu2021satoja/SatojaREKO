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

const addProduct = async (productObject) => {
  const response = await axios.post(
    `${apiUrl}/${productObject.product.sellers_id}`,
    productObject
  )
  return response
}

export default { getUserProducts, getProducts, addProduct }
