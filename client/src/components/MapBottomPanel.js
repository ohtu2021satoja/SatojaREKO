import "./MapPage.css"
import { forwardRef } from "react"

const MapBottomPanel = forwardRef((props, ref) => {
  const mapEvents = props.visibleEvents.map((event, index) => (
    <div key={index} style={{ marginBottom: 10 }}>
      {event.name} <br />
      {event.address} <br />
      {event.start} - {event.end}
    </div>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {mapEvents}
    </div>
  )
})

export default MapBottomPanel
