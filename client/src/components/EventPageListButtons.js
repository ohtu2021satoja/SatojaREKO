import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"

const EventPageListButtons = ({ eventID, addToCart, removeFromCart, size, unit }) => {
  const cart = useSelector((state) => state.shoppingCart)
  return (
    <Col xs={8}>
      <b>
        {size.unit} {unit}{" "}
      </b>
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          removeFromCart(size)
        }}
      >
        -
      </Button>{" "}
      {(() => {
        const eventOrders = cart.find((order) => order.event_id === eventID)
        if (eventOrders) {
          const batch = eventOrders.batches.find((batch) => batch.size_id === size.id)
          if (batch) return batch.order_quantity
          else return 0
        } else return 0
      })()}{" "}
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          addToCart(size)
        }}
      >
        +
      </Button>
    </Col>
  )
}

export default EventPageListButtons
