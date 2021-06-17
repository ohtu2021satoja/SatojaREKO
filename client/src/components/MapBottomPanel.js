import "./MapPage.css"
import { forwardRef } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EventPage from "./EventPage"
import EventInfoLabel from "./EventInfoLabel"

const MapBottomPanel = forwardRef((props, ref) => {
  const markets = props.visibleMarkets.map((event, index) => (
    <Card key={index} className="mb-3">
      <EventInfoLabel event={event} classes="mb-0" />
      <Button
        className="btn btn-primary btn-sm"
        variant="success"
        onClick={() =>
          props.handleOpenPage(
            EventPage({
              event: event,
              closePage: props.handleClosePage,
              openProductPage: props.handleOpenProduct,
              closeProductPage: props.handleCloseProduct,
            })
          )
        }
      >
        Siirry tilaisuuteen
      </Button>
    </Card>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {markets}
    </div>
  )
})

export default MapBottomPanel
