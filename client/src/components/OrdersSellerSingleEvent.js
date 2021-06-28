import Col from "react-bootstrap/Col"
import OrderSellerNav from "./OrderSellerNav"
import OrderSellerNavigationBar from "./OrderSellerNavigationbar"
import OrderSellerTimeHeader from "./OrderSellerTimeHeader"
import OrdersSellerBuyers from "./OrderSellerBuyers"
import OrderSellerProducts from "./OrderSellerProducts"
import OrdersSellerEvent from "./OrdersSellerEvent"

const OrdersSellerSingleEvent = (props) => {
  // date manipulations, disgusting I know  --Yoda
  const x = props.Events.find((y) => y.id === props.eventId)
  const date = new Date(x.date)
  const dateHour = date.getHours()
  var dateMinutes = date.getMinutes()
  const month = date.getMonth() + 1
  const thisDate = date.getDate()
  var paiva = date.getDay()
  var datepaiva
  if (paiva === 1) {
    datepaiva = "Maanantai"
  }
  if (paiva === 2) {
    datepaiva = "Tiistai"
  }
  if (paiva === 3) {
    datepaiva = "Keskiviikko"
  }
  if (paiva === 4) {
    datepaiva = "Torstai"
  }
  if (paiva === 5) {
    datepaiva = "Perjantai"
  }
  if (paiva === 6) {
    datepaiva = "Lauantai"
  }
  if (paiva === 7) {
    datepaiva = "Sunnuntai"
  }
  if (dateMinutes === 0) {
    dateMinutes = "00"
  }
  if (props.eventId === null) {
    return (
      <OrdersSellerEvent tapahtumat={props.tapahtumat} setEventId={props.setEventId} />
    )
  } else {
    return (
      <>
        <OrderSellerNav
          navLink="/orders/seller"
          navHeader="Tilaukset"
          altText="Palaa tapahtumiin"
          HandleBackButton={props.HandleBackButton}
        />
        <OrderSellerTimeHeader
          datepaiva={datepaiva}
          dateHour={dateHour}
          dateMinutes={dateMinutes}
          month={month}
          thisDate={thisDate}
          x={x}
        />
        <Col xs={12}>
          <OrderSellerNavigationBar
            HandleProductButton={props.HandleProductButton}
            HandleOrderButton={props.HandleOrderButton}
          />
          {props.ListView ? (
            <OrderSellerProducts
              orderProducts={props.orderProducts}
              orderers={props.orderers}
              setBuyerInfo={props.setBuyerInfo}
              buyerInfo={props.buyerInfo}
            />
          ) : (
            <OrdersSellerBuyers
              orderProducts={props.orderProducts}
              orderers={props.orderers}
              setBuyerInfo={props.setBuyerInfo}
              buyerInfo={props.buyerInfo}
              buyerIndexi={props.buyerIndexi}
              setBuyerIndexi={props.setBuyerIndexi}
            />
          )}
        </Col>
      </>
    )
  }
}

export default OrdersSellerSingleEvent
