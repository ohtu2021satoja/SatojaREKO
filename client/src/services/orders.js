import axios from "axios"

const apiUrl = "/api/orders"

const submitBuyerOrders = async (orders, buyerID) => {
  const response = await axios.post(`${apiUrl}/buyer/${buyerID}`, orders)
  return response
}

export { submitBuyerOrders }
