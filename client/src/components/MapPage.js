import "./MapPage.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const MapPage = () => {
  return (
    // Ristiina 61.5073033227113, 27.25752603700839
    <MapContainer
      center={[61.5073033227113, 27.25752603700839]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[61.51291817903732, 27.243845125180133]}>
        <Popup>
          Noutotilaisuus <br /> Brahentie 4
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapPage
