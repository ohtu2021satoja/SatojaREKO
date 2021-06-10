import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { submitOrders } from "../reducers/shoppingCart"
import { useDispatch, useSelector } from "react-redux"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.shoppingCart)
  const buyerID = 4

  const handleSubmitOrders = () => {
    const eventOrders = Object.keys(state.orders).map((eventID) => {
      const eventSizes = Object.keys(state.orders[eventID]).map((sizeID) => {
        return { size_id: sizeID, order_quantity: state.orders[eventID][sizeID] }
      })
      return { event_id: eventID, batches: eventSizes }
    })
    const submittableOrders = { orders: eventOrders }
    console.log(submittableOrders)
    dispatch(submitOrders(submittableOrders, buyerID))
  }

  return (
    <Row className="mt-5 mx-2">
      <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
        <h2 className="mb-4">Ostoskori</h2>
        {Object.keys(state.orders).map((eventID) => {
          return (
            <div>
              tapahtumassa {state.events[eventID].name} on tilaus{" "}
              {Object.keys(state.orders[eventID]).length} eri tuotekoosta:
              <br />
              <br />
              {Object.keys(state.orders[eventID]).map((sizeID) => {
                return (
                  <p>
                    {state.orders[eventID][sizeID]} X {state.products[sizeID].name}{" "}
                    {
                      state.products[sizeID].sizes.find(
                        (size) => size.id.toString() === sizeID
                      ).unit
                    }{" "}
                    {state.products[sizeID].type}
                  </p>
                )
              })}
            </div>
          )
        })}
        <Button variant="success" onClick={handleSubmitOrders}>
          Lähetä tilaus
        </Button>
      </Col>
    </Row>
  )
}

export default ShoppingCart
