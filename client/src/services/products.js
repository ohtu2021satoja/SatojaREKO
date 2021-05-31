import axios from "axios"

const apiUrl = "/api/products"

const products = [
  {
    name: "mansikka 5kg laatikko",
    sold: 5,
    soldlimit: 10,
    price: 52,
    image: "https://www.satotukku.fi//i/t/mansikka.8ee8a02c75.jpg",
  },
  {
    name: "herne 1 litra",
    sold: 3,
    soldlimit: 15,
    price: 23,
    image: "http://www.hankkija.fi/Liitetiedostot/Pics/herneetw900.jpg",
  },
  {
    name: "naudan sisäfile",
    sold: 2,
    soldlimit: 4,
    price: 66,
    image: "https://www.wotkins.fi/wp-content/uploads/2016/05/naudan_sisafilee.jpg",
  },
]

export const getProducts = () => {
  return products
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

export default { getUserProducts, getProducts, addProduct }
/*
export const getProducts = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}
*/
