import { getMapData } from "../services/map"

export const RECEIVE_MAP_POINTS = "RECEIVE_MAP_POINTS"

export const getMapPoints = () => {
  return async (dispatch) => {
    const data = await getMapData()
    console.log("data in action: ", data)
    dispatch({ type: "RECEIVE_MAP_POINTS", data: data })
  }
}
