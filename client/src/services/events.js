import axios from "axios"

const apiUrl = "/api/events"

export const getEvents = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

/*
const getSellerEvents = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}
*/

export const getSellersUpcomingEventsWithProducts = (id) => {
  const request = axios.get(`/api/sellers/events/${id}`)
  return request.then((response) => response.data)
}

export const getEventProduct = async (eventID, productID) => {
  const response = await axios.get(`${apiUrl}/${eventID}/products/${productID}`)
  return response
}

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

const updateEvent = async (start, end, market_id, event_id) => {
  const response = await axios.put(`${apiUrl}/${event_id}`, {
    start,
    end,
    market_id,
  })
  return response
}

export default { /*getEvents,*/ getSellersUpcomingEvents, addEvent, updateEvent }
