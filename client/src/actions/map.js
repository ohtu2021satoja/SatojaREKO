import { getMapData } from "../services/map"

export const RECEIVE_MAP_POINTS = "RECEIVE_MAP_POINTS"

export const getMapPoints = () => {
  return async (dispatch) => {
    try {
      const data = await getMapData()
      dispatch({ type: "RECEIVE_MAP_POINTS", data: data })
    } catch (e) {
      console.log(e)
    }
  }
}
