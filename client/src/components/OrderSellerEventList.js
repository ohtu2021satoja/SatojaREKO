import Col from "react-bootstrap/esm/Col"
import OrdersSellerEvent from "./OrdersSellerEvent"

const OrderSellerEventList = (props) => {
  const Paivamaarat = (date, index) => {
    // sorting events by date
    const tapahtumat = []
    for (let i = 0; i < props.paivamaarat.length; i++) {
      var date2 = props.paivamaarat[i]
      if (
        date2.getDate() === date.getDate() &&
        date2.getMonth() === date.getMonth() &&
        date2.getFullYear() === date.getFullYear()
      ) {
        tapahtumat.push(date)
      }
    }

    if (props.eventId === null) {
      return (
        <Col
          key={index}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <h4 className="mb-0 pt-3">
            {date.getDate()}.{date.getMonth() + 1}.
          </h4>
          <OrdersSellerEvent
            setEventId={props.setEventId}
            Orderasd={props.Orderasd}
            tapahtumat={tapahtumat}
          />
        </Col>
      )
    }
  }
  return props.paivamaarat.map(Paivamaarat)
}
export default OrderSellerEventList
