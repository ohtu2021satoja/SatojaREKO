import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const ShoppingCartListButtons = ({
  eventID,
  addToCart,
  removeFromCart,
  size,
  unit,
  singleSize,
}) => {
  const cart = useSelector((state) => state.shoppingCart)

  const [inCart, setInCart] = useState(0)
  useEffect(() => {
    const updateCart = () => {
      const eventOrders = cart.find((order) => order.event_id === eventID)
      if (eventOrders) {
        const batch = eventOrders.batches.find((batch) => batch.size_id === size.size_id)
        if (batch) setInCart(batch.order_quantity)
        else setInCart(0)
      } else setInCart(0)
    }

    updateCart()
  }, [cart, eventID, size.size_id])

  return (
    <Row className="align-items-center">
      <Col xs={4} className="text-right">
        {singleSize
          ? (size.product.unit_price * size.unit) / 100 + "e / kpl"
          : size.unit +
            " " +
            unit +
            " / " +
            (size.product.unit_price * size.unit) / 100 +
            "e"}
      </Col>
      <Col xs={8}>
        <Row className="pr-2 justify-content-center align-items-center">
          <Col xs={4} className="text-right">
            <Button
              className="cart-button"
              size="sm"
              variant="light"
              onClick={(e) => {
                if (inCart > 0) removeFromCart(size)
              }}
            >
              <h4>
                <i className="bi bi-dash-circle-fill" style={{ fontSize: 28 }} />
              </h4>
            </Button>{" "}
          </Col>
          <Col xs={4} className="text-center">
            <h5>{inCart}</h5>
          </Col>
          <Col xs={4} className="text-left">
            <Button
              className="cart-button"
              size="sm"
              variant="light"
              onClick={(e) => {
                if (inCart < size.quantity) addToCart(size)
              }}
            >
              <h4>
                <i className="bi bi-plus-circle-fill" style={{ fontSize: 28 }} />
              </h4>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ShoppingCartListButtons
