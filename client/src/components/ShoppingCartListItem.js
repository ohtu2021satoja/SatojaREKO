import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import ShoppingCartListButtons from "./ShoppingCartListButtons"

const ShoppingCartListItem = ({ event, sizes, product }) => {
  const singleSize = product.singleSize

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
          <Card.Subtitle className="mb-2 text-muted">{product.seller_name}</Card.Subtitle>
          <Card.Title>
            {singleSize
              ? product.name + " " + product.sizes[0].unit + " " + product.type
              : product.name + " " + product.unit_price / 100 + "e / " + product.type}
          </Card.Title>
          <Card.Subtitle>{product.description}</Card.Subtitle>
        </Col>
      </Row>
      <Row>
        {sizes.map((size, index) => (
          <ShoppingCartListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id ? event.id : event.event_id}
            size={size}
            unit={product.type}
            key={index}
            singleSize={singleSize}
          />
        ))}
      </Row>
    </Card>
  )
}

export default ShoppingCartListItem
