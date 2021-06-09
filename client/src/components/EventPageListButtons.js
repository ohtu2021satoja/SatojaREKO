import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"

const EventPageListButtons = ({ eventID, addToCart, removeFromCart, size, unit }) => {
  const amountInCart = useSelector((state) => state.shoppingCart)
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
          removeFromCart(size.id)
        }}
      >
        -
      </Button>{" "}
      {amountInCart[eventID] ? amountInCart[eventID][size.id] : 0}{" "}
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          addToCart(size.id)
        }}
      >
        +
      </Button>
    </Col>
  )
}

export default EventPageListButtons
