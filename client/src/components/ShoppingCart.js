import Button from "react-bootstrap/Button"
import { submitOrders } from "../reducers/shoppingCart"
import { useDispatch, useSelector } from "react-redux"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.shoppingCart)
  const buyerID = 4

  const handleSubmitOrders = () => {
    const eventOrders = Object.keys(state).map((eventID) => {
      const eventSizes = Object.keys(state[eventID]).map((sizeID) => {
        return { size_id: sizeID, order_quantity: state[eventID][sizeID] }
      })
      return { event_id: eventID, batches: eventSizes }
    })
    const submittableOrders = { orders: eventOrders }
    console.log(submittableOrders)
    dispatch(submitOrders(buyerID))
  }

  return (
    <div>
      <p>Ostoskärry</p>
      <Button variant="primary" onClick={handleSubmitOrders}>
        Lähetä tilaus
      </Button>
    </div>
  )
}

export default ShoppingCart
