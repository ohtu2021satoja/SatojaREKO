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
        <div className="mt-2 px-1 py-1 border-0 popup-text">
          {seller.name} <br />
          {seller.address} <br />
          <Button
            style={{ color: "white" }}
            variant="success"
            size="sm"
            block
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
        </div>
      </Popup>
    </Marker>
  )
}

export default MapMarkerSeller
