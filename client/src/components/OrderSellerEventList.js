import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import OrdersSellerEvent from "./OrdersSellerEvent"

const OrderSellerEventList = (props) => {
  const Paivamaarat = (date, index) => {
    // sorting events by date
    var date1 = new Date(date)
    const tapahtumat = []
    for (let i = 0; i < props.Events.length; i++) {
      var date2 = new Date(props.Events[i].date)
      if (
        date2.getDate() === date1.getDate() &&
        date2.getMonth() === date1.getMonth() &&
        date2.getFullYear() === date1.getFullYear()
      ) {
        tapahtumat.push(props.Events[i])
      }
    }
    if (props.eventId === null) {
      return (
        <div key={index}>
          <Row>
            <Col className="text-center">
              {date1.getDate()}.{date1.getMonth() + 1}.{date1.getFullYear()}
            </Col>
          </Row>
          <OrdersSellerEvent
            index={index}
            Events={props.Events}
            Event={props.Events[props.eventId]}
            setEventId={props.setEventId}
            eventId={props.eventId}
            setListView={props.setListView}
            ListView={props.ListView}
            orderProducts={props.orderProducts}
            orderers={props.orderers}
            setBuyerInfo={props.setBuyerInfo}
            buyerInfo={props.buyerInfo}
            HandleBackButton={props.HandleBackButton}
            HandleProductButton={props.HandleProductButton}
            HandleOrderButton={props.HandleOrderButton}
            uniqueDates={props.uniqueDates}
            tapahtumat={tapahtumat}
          />
        </div>
      )
    }
  }
  return props.uniqueDates.map(Paivamaarat)
}
export default OrderSellerEventList