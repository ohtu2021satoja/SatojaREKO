import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const ProductPageListButtons = ({
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
      const eventOrders = cart.find((order) => Number(order.event_id) === Number(eventID))
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
      <Col xs={6} sm={5} md={{ span: 3, offset: 2 }}>
        <b>
          {singleSize
            ? size.price / 100 + "e / kpl"
            : size.unit + unit + " / " + size.price / 100 + "e"}
        </b>
      </Col>
      <Col xs={6} sm={5} md={5}>
        <Row className="justify-content-around">
          <Button
            size="sm"
            variant="light"
            onClick={(e) => {
              removeFromCart(size)
            }}
          >
            <h4>
              <i className="bi bi-dash-circle-fill" style={{ fontSize: 28 }} />
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
              <i className="bi bi-plus-circle-fill" style={{ fontSize: 28 }} />
            </h4>
          </Button>
        </Row>
      </Col>
    </Row>
  )
}

export default ProductPageListButtons
