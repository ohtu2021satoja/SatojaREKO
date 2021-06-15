import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const ProductPageListButtons = ({ eventID, addToCart, removeFromCart, size, unit }) => {
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
    <>
      <Col xs={6} className="d-flex justify-content-center align-items-center">
        <b>
          {size.unit} {unit}
        </b>
      </Col>
      <Col xs={6} className="d-flex justify-content-between align-items-center">
        <Button
          size="sm"
          variant="light"
          onClick={(e) => {
            removeFromCart(size)
          }}
        >
          <h4>
            <i className="bi bi-cart-dash" style={{ fontSize: 28 }} />
          </h4>
        </Button>{" "}
        <h5>{inCart} </h5>
        <Button
          size="sm"
          variant="light"
          onClick={(e) => {
            if (inCart < size.quantity) addToCart(size)
          }}
        >
          <h4>
            <i className="bi bi-cart-plus" style={{ fontSize: 28 }} />
          </h4>
        </Button>
      </Col>
    </>
  )
}

export default ProductPageListButtons
