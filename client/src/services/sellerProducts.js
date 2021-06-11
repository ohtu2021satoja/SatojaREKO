import axios from "axios"

const apiUrl = "/api/products/seller"

export const getSellerProducts = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

// TODO: add product

// TODO: delete product

// TODO: update product

export default { getSellerProducts }
