export const RECEIVE_EVENTS = "RECEIVE_EVENTS"

const receiveEvents = (events) => {
  return {
    type: RECEIVE_EVENTS,
    events,
  }
}

export default { receiveEvents }
