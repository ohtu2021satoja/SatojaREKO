import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { submitOrders } from "../actions/shoppingCart"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import ShoppingCartListItem from "./ShoppingCartListItem"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart)
  const buyerID = 4
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const total =
      cart.reduce(
        (acc, order) =>
          acc +
          order.batches.reduce(
            (acc, batch) =>
              acc + batch.order_quantity * batch.unit * batch.product.unit_price,
            0
          ),
        0
      ) / 100
    setTotalPrice(total || 0)
  }, [cart])

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
      dispatch(submitOrders({ orders: orders }, buyerID))
    }
  }

  const orderHasSizes = (order) => {
    return order.batches.reduce((acc, batch) => acc + batch.order_quantity, 0) > 0
  }

  return (
    <Row className="mt-5 mx-2">
      <Col xs={{ span: 12, offset: 0 }} className="mb-4 text-center">
        <h2 className="mb-4">Ostoskori</h2>
        {cart.map((order, index) => {
          if (orderHasSizes(order)) {
            return (
              <div key={index}>
                Noutotilaus paikassa {order.event.name} {order.event.type} <br />{" "}
                Tuotteet: <br />
                {order.batches.map((batch, index) => {
                  if (batch.order_quantity > 0) {
                    return (
                      <ShoppingCartListItem
                        event={order.event}
                        batch={batch}
                        total={totalPrice}
                        key={index}
                      />
                    )
                  } else return null
                })}
              </div>
            )
          } else return null
        })}
        <div>{totalPrice > 0 && <h3>Yhteensä: {totalPrice}e</h3>}</div>
        <Button variant="success" onClick={handleSubmitOrders}>
          Lähetä tilaus
        </Button>
      </Col>
    </Row>
  )
}

export default ShoppingCart
