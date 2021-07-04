import { getEvents } from "../services/events"

export const RECEIVE_EVENTS = "RECEIVE_EVENTS"

export const receiveEvents = () => {
  return async (dispatch) => {
    try {
      const events = await getEvents()
      dispatch({ type: "RECEIVE_EVENTS", events: events })
    } catch (e) {
      console.log(e)
    }
  }
}
