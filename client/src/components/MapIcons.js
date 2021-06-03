import eventSVG from "../media/map-marker-event.svg"
import sellerSVG from "../media/map-marker-seller.svg"
import L from "leaflet"

const iconSize = new L.Point(30, 50)

const eventMarker = new L.Icon({
  iconUrl: eventSVG,
  iconRetinaUrl: eventSVG,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: iconSize,
  className: "leaflet-div-icon",
})

const sellerMarker = new L.Icon({
  iconUrl: sellerSVG,
  iconRetinaUrl: sellerSVG,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: iconSize,
  className: "leaflet-div-icon",
})

export { eventMarker, sellerMarker }
