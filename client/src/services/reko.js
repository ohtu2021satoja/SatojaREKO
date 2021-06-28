import axios from "axios"

const apiUrl = "/api/reko_areas"

export const addRekoArea = async ({ name, area }) => {
  const response = await axios.post(`${apiUrl}`, {
    name,
    area,
  })
  return response.data
}

export default { addRekoArea }
