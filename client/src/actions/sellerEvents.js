import { getSellersUpcomingEventsWithProducts } from "../services/events"

export const RECEIVE_SELLER_EVENTS = "RECEIVE_SELLER_EVENTS"

export const receiveSellerEvents = (id) => {
  return async (dispatch) => {
    try {
      const events = await getSellersUpcomingEventsWithProducts(id)
      console.log("data in action: ", events)
      dispatch({ type: "RECEIVE_SELLER_EVENTS", events: events })
    } catch (e) {
      console.log(e)
    }
  }
}
