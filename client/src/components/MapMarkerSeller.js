import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

const MapMarkerSeller = ({ seller, icon, mapInstance }) => {
  return (
    <Marker
      position={[Number(seller.location.lat), Number(seller.location.lon)]}
      icon={icon}
      eventHandlers={{
        click: (e) => {
          mapInstance.flyTo(e.latlng, mapInstance.getZoom())
        },
      }}
    >
      <Popup autoPan={false}>
        {seller.name} <br />
        {seller.address} <br />
        <Button
          className="btn btn-success btn-sm popup-button"
          style={{ color: "white" }}
          variant="success"
          as={Link}
          to={{
            pathname: `/sellers/${seller.id}`,
            state: {
              seller: seller,
              linkTo: {
                pathname: "/map",
              },
            },
          }}
        >
          Tuottajan sivulle
        </Button>
      </Popup>
    </Marker>
  )
}

export default MapMarkerSeller
