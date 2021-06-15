import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import ShoppingCartListButtons from "./ShoppingCartListButtons"

const ShoppingCartListItem = ({ event, sizes, product }) => {
  const [totalWeight, setTotalWeight] = useState(0)

  useEffect(() => {
    const total = sizes.reduce((acc, size) => acc + size.unit * size.order_quantity, 0)
    setTotalWeight(total)
  }, [sizes])

  const dispatch = useDispatch()

  const handleAddToCart = (batch) => {
    if (batch.order_quantity < batch.quantity)
      dispatch(addProductToCart(batch.product, batch, event))
  }

  const handleRemoveFromCart = (batch) => {
    dispatch(removeProductFromCart(batch.product, batch, event))
  }

  return (
    <Card className="mb-1 py-2 px-2">
      <Row>
        <Col xs={4}>
          <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
        </Col>
        <Col xs={8} className="text-left">
          <Card.Subtitle className="mb-2 text-muted">Myyjä X</Card.Subtitle>
          <Card.Title>
            {product.name} {product.unit_price / 100}e/{product.type}
          </Card.Title>
          <Card.Title>
            Yhteensä {totalWeight} {product.type}
          </Card.Title>
          <Card.Title></Card.Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-3">
          <Card.Text className="text-center">{product.description}</Card.Text>
        </Col>
        {sizes.map((size, index) => (
          <ShoppingCartListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id}
            size={size}
            unit={product.type}
            key={index}
          />
        ))}
      </Row>
    </Card>
  )
}

export default ShoppingCartListItem
