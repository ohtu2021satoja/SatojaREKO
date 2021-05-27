import axios from "axios"

const apiUrl = "/api/events"

const getSellersUpcomingEvents = (id) => {
  const request = axios.get(`${apiUrl}/seller/${id}`)
  return request.then((response) => response.data)
}

export default { getSellersUpcomingEvents}
