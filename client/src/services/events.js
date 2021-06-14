import axios from "axios"

const apiUrl = "/api/events"

/*
const getEvents = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}
*/

const getSellersUpcomingEvents = (id) => {
  const request = axios.get(`${apiUrl}/seller/${id}`)
  return request.then((response) => response.data)
}

const addEvent = async (start, end, market_id) => {
  const response = await axios.post(`${apiUrl}`, {
    start,
    end,
    market_id,
  })
  return response
}

export default { /*getEvents,*/ getSellersUpcomingEvents, addEvent }
