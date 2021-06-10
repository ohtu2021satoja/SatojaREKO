import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { submitOrders } from "../actions/shoppingCart"
import { useDispatch, useSelector } from "react-redux"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart)
  const buyerID = 4

  const handleSubmitOrders = () => {
    const orders = []
    cart.forEach((order) => {
      const orderBatches = []
      order.batches.forEach((batch) => {
        if (batch.order_quantity > 0) {
          orderBatches.push({
            size_id: batch.size_id,
            order_quantity: batch.order_quantity,
          })
        }
      })
      if (orderBatches.length > 0) {
        orders.push({ event_id: order.event_id, batches: orderBatches })
      }
    })
    if (orders.length > 0) {
      console.log(orders)
      dispatch(submitOrders({ orders: orders }, buyerID))
    }
  }

  const orderHasSizes = (order) => {
    return order.batches.reduce((acc, batch) => acc + batch.order_quantity, 0) > 0
  }

  return (
    <Row className="mt-5 mx-2">
      <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
        <h2 className="mb-4">Ostoskori</h2>
        {cart.map((order, index) => {
          if (orderHasSizes(order)) {
            return (
              <div key={index}>
                Noutotilaus paikassa {order.event.name} <br /> Tuotteet: <br />
                {order.batches.map((batch) => {
                  if (batch.order_quantity > 0) {
                    return (
                      <p>
                        {batch.order_quantity} x {batch.product.name} {batch.unit}{" "}
                        {batch.product.type}
                      </p>
                    )
                  } else return null
                })}
              </div>
            )
          } else return null
        })}
        <Button variant="success" onClick={handleSubmitOrders}>
          Lähetä tilaus
        </Button>
      </Col>
    </Row>
  )
}

export default ShoppingCart
