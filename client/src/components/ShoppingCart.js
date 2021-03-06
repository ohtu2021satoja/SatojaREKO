import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { submitOrders } from "../actions/shoppingCart"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import ShoppingCartListItem from "./ShoppingCartListItem"
import EventInfoLabel from "./EventInfoLabel"
import { Link } from "react-router-dom"
import ShoppingCartNotification from "./ShoppingCartNotification"
import ShoppingCartPanel from "./ShoppingCartPanel"
import { useHistory } from "react-router-dom"

const ShoppingCart = ({ fullyAuthorized }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.shoppingCart)
  const user = useSelector((state) => state.authedUser)

  const [totalPrice, setTotalPrice] = useState(0)
  const [orderSent, setOrderSent] = useState(false)

  useEffect(() => {
    const getTotalPrice = () => {
      const total =
        Math.round(
          cart.reduce(
            (acc, order) =>
              acc +
              order.batches.reduce(
                (acc, batch) =>
                  acc + batch.order_quantity * batch.unit * batch.product.unit_price,
                0
              ),
            0
          ) * 100
        ) / 10000
      return total
    }
    setTotalPrice(getTotalPrice() || 0)
  }, [cart])

  const handleSubmitOrders = () => {
    if (fullyAuthorized) {
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
        dispatch(submitOrders({ orders: orders }, user.id))
        setOrderSent(true)
      }
    } else {
      history.push("/login")
    }
  }

  const sortSizesByProduct = (order) => {
    const sortedSizes = []
    order.batches.map((batch) => {
      const currentProduct = sortedSizes.find(
        (size) => size.product.id === batch.product.id
      )
      if (batch.order_quantity > 0) {
        if (currentProduct) {
          return currentProduct.batches.push(batch)
        } else {
          return sortedSizes.push({
            product: batch.product,
            batches: [batch],
          })
        }
      } else return null
    })
    return sortedSizes
  }

  const orderHasSizes = (order) => {
    return order.batches.reduce((acc, batch) => acc + batch.order_quantity, 0) > 0
  }

  return (
    <Row className="mb-0 pb-0 bg-light-blue h-100">
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="pt-5 text-center"
      >
        <h2 className="mb-4">Ostoskori</h2>
        {cart.map((order, index) => {
          if (orderHasSizes(order)) {
            return (
              <div key={index}>
                <h6>
                  <u>Noutotilaisuus</u>
                </h6>
                <div className="mb-3">
                  <EventInfoLabel
                    event={order.event}
                    market={order.event.market}
                    classes="mb-0 mt-0"
                    styles={{ fontSize: "1rem" }}
                  />
                </div>
                {
                  // Sort orders by product to render different sizes
                  // of same product on the same card
                  sortSizesByProduct(order).map((product, index) => {
                    return (
                      <ShoppingCartListItem
                        event={order.event}
                        product={product.product}
                        sizes={product.batches}
                        key={index}
                      />
                    )
                  })
                }
                <Row className="pt-2 justify-content-between align-items-center">
                  <Col xs={6} className="text-left">
                    <h5>
                      YHTEENS??{" "}
                      {Math.round(
                        order.batches.reduce(
                          (acc, size) =>
                            acc +
                            size.order_quantity * size.unit * size.product.unit_price,
                          0
                        ) * 100
                      ) / 10000}
                      e
                    </h5>
                  </Col>
                  <Col xs={6} className="text-right">
                    <Button
                      variant="success"
                      as={Link}
                      className="mb-3 text-decoration-none"
                      to={{
                        pathname: `/events/${
                          order.event.event_id ? order.event.event_id : order.event.id
                        }`,
                        state: {
                          market: order.event.market,
                          event: order.event,
                          linkTo: {
                            pathname: "/cart",
                          },
                        },
                      }}
                    >
                      + Lis???? tuotteita
                    </Button>
                  </Col>
                </Row>
              </div>
            )
          } else return null
        })}
        {!(totalPrice > 0) && (
          <>
            <p>Ostoskorisi on tyhj??.</p>
            <p>
              L??yd??t noutotilaisuuksia <Link to="/map">karttasivulta.</Link>
            </p>
          </>
        )}
      </Col>
      {totalPrice > 0 && (
        <ShoppingCartPanel
          totalPrice={totalPrice}
          handleSubmitOrders={handleSubmitOrders}
        />
      )}
      {orderSent ? <ShoppingCartNotification /> : null}
    </Row>
  )
}

export default ShoppingCart
