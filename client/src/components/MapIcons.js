import eventSVG from "../media/map-marker-event.svg"
import sellerSVG from "../media/map-marker-seller.svg"
import L from "leaflet"

const iconSize = new L.Point(25, 50)

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

const sellerMarkerHTML = new L.divIcon({
  className: "marker-seller",
  html: `<svg aria-hidden="false" focusable="false" data-prefix="fas" data-icon="map-marker" class="svg-inline--fa fa-map-marker fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
  <path fill="currentColor" stroke="black" stroke-width="0" stroke-linejoin="round" stroke-dasharray="2,2" d=" M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
  <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial" font-size="220px" dy=".3em">T</text>
</svg>`,
  iconSize: iconSize,
})

const eventMarkerHTML = new L.divIcon({
  className: "marker-event",
  html: `<svg aria-hidden="false" focusable="false" data-prefix="fas" data-icon="map-marker" class="svg-inline--fa fa-map-marker fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
  <path fill="currentColor" stroke="black" stroke-width="0" stroke-linejoin="round" stroke-dasharray="2,2" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
  <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial" font-size="220px" dy=".3em">R</text>
</svg>`,
  iconSize: iconSize,
})

export { eventMarker, sellerMarker, sellerMarkerHTML, eventMarkerHTML }
