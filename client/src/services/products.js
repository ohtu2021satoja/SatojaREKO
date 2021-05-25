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

export default { getUserProducts, getProducts }
