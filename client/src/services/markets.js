import axios from "axios"

const apiUrl = "api/markets"

const addMarket = async (address, rekoChoices) => {
  const response = await axios.post(`${apiUrl}`, {
    area,
    address,
    rekoChoices,
  })
  return response
}

export default { addMarket }
