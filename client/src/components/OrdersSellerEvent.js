import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

const OrdersSellerEvent = (props) => {
  const RenderEvents = (tapahtuma, index) => {
    var date = new Date(tapahtuma.date)
    var dateMinutes = date.getMinutes()
    // changes 10:0 to 10:00
    if (date.getMinutes() === 0) {
      dateMinutes = "00"
    }

    return (
      <Card
        as={Col}
        key={index}
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
        onClick={() => props.setEventId(tapahtuma.id)}
      >
        <div>{tapahtuma.name}</div>
        {tapahtuma.address}
        <div>
          aika {date.getHours()}:{dateMinutes}-
        </div>
      </Card>
    )
  }
  return <div>{props.tapahtumat.map(RenderEvents)}</div>
}

export default OrdersSellerEvent
