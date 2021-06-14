import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const EventPageListButtons = ({ eventID, addToCart, removeFromCart, size, unit }) => {
  const cart = useSelector((state) => state.shoppingCart)
  const [inCart, setInCart] = useState(0)
  useEffect(() => {
    const updateCart = () => {
      const eventOrders = cart.find((order) => order.event_id === eventID)
      if (eventOrders) {
        const batch = eventOrders.batches.find((batch) => batch.size_id === size.id)
        if (batch) setInCart(batch.order_quantity)
        else setInCart(0)
      } else setInCart(0)
    }
    updateCart()
  }, [cart, eventID, size.id])

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
      {inCart}{" "}
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          if (inCart < size.quantity) addToCart(size)
        }}
      >
        +
      </Button>
    </Col>
  )
}

export default EventPageListButtons
