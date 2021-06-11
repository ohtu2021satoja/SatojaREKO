export const RECEIVE_SELLER_EVENTS = "RECEIVE_SELLER_EVENTS"

const receiveSellerEvents = (events) => {
  return {
    type: RECEIVE_SELLER_EVENTS,
    events,
  }
}

export default { receiveSellerEvents }
