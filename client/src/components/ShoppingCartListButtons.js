import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"

const ShoppingCartListButtons = ({ eventID, addToCart, removeFromCart, batch }) => {
  const cart = useSelector((state) => state.shoppingCart)
  return (
    <Col xs={8}>
      <b>
        {batch.unit} {batch.product.type}{" "}
      </b>
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          removeFromCart(batch)
        }}
      >
        -
      </Button>{" "}
      {(() => {
        const eventOrders = cart.find((order) => order.event_id === eventID)
        if (eventOrders) {
          const currentBatch = eventOrders.batches.find(
            (b) => b.size_id === batch.size_id
          )
          if (currentBatch) return currentBatch.order_quantity
          else return 0
        } else return 0
      })()}{" "}
      <Button
        size="lg"
        variant="outline-dark"
        onClick={(e) => {
          e.stopPropagation()
          addToCart(batch)
        }}
      >
        +
      </Button>
    </Col>
  )
}

export default ShoppingCartListButtons
