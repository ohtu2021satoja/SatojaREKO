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
        key={index}
        className="mb-1 bg-light-gray border border-1 border-secondary"
        onClick={() => props.setEventId(tapahtuma.id)}
      >
        <Card.Body>
          <Card.Text className="mb-0">{tapahtuma.name}</Card.Text>
          <Card.Text className="mb-0">{tapahtuma.address}</Card.Text>
          <Card.Text className="mb-0">
            {date.getHours()}:{dateMinutes} -
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  return <div>{props.tapahtumat.map(RenderEvents)}</div>
}

export default OrdersSellerEvent
