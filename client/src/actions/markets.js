export const RECEIVE_MARKETS = "RECEIVE_MARKETS"

const receiveMarkets = (markets) => {
  return {
    type: RECEIVE_MARKETS,
    markets,
  }
}

export default { receiveMarkets }
