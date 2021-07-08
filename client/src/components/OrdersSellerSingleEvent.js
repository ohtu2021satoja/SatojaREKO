import Col from "react-bootstrap/esm/Col"
//mport OrdersSellerTitle from "./OrdersSellerTitle"
//import OrderSellerBackButton from "./OrderSellerBackButton"
import OrderSellerNavigationBar from "./OrderSellerNavigationbar"
import OrderSellerTimeHeader from "./OrderSellerTimeHeader"
import OrdersSellerBuyers from "./OrderSellerBuyers"
import OrderSellerProducts from "./OrderSellerProducts"
import OrdersSellerEvent from "./OrdersSellerEvent"
import OrderSellerNav from "./OrderSellerNav"

const OrdersSellerSingleEvent = (props) => {
  // date manipulations, disgusting I know  --Yoda
  const foundEvent = props.Orderasd.find((x) => x.event_id === props.eventId)

  const dateStart = new Date(foundEvent.event_start)
  const dateEnd = new Date(foundEvent.event_endtime)

  const dateHourEnd = dateEnd.getHours()
  var dateMinutesEnd = dateEnd.getMinutes()
  const dateHourStart = dateStart.getHours()
  var dateMinutesStart = dateStart.getMinutes()
  const Month = dateStart.getMonth() + 1
  const thisDate = dateStart.getDate()
  var paivaStart = dateStart.getDay()

  var datepaiva
  if (paivaStart === 1) {
    datepaiva = "Maanantai"
  }
  if (paivaStart === 2) {
    datepaiva = "Tiistai"
  }
  if (paivaStart === 3) {
    datepaiva = "Keskiviikko"
  }
  if (paivaStart === 4) {
    datepaiva = "Torstai"
  }
  if (paivaStart === 5) {
    datepaiva = "Perjantai"
  }
  if (paivaStart === 6) {
    datepaiva = "Lauantai"
  }
  if (paivaStart === 7) {
    datepaiva = "Sunnuntai"
  }
  if (dateMinutesStart === 0) {
    dateMinutesStart = "00"
  }
  if (dateMinutesEnd === 0) {
    dateMinutesEnd = "00"
  }
  if (props.eventId === null) {
    return (
      <OrdersSellerEvent tapahtumat={props.tapahtumat} setEventId={props.setEventId} />
    )
  } else {
    if (props.ListView) {
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
            dateHourStart={dateHourStart}
            dateMinutesStart={dateMinutesStart}
            month={Month}
            dateHourEnd={dateHourEnd}
            dateMinutesEnd={dateMinutesEnd}
            thisDate={thisDate}
            Order={foundEvent}
          />
          <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <OrderSellerNavigationBar
              HandleProductButton={props.HandleProductButton}
              HandleOrderButton={props.HandleOrderButton}
            />
            <OrderSellerProducts
              setBuyerInfo={props.setBuyerInfo}
              buyerInfo={props.buyerInfo}
              Order={foundEvent}
              setListView={props.setListView}
            />
          </Col>
        </>
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
            dateHourStart={dateHourStart}
            dateMinutesStart={dateMinutesStart}
            month={Month}
            dateHourEnd={dateHourEnd}
            dateMinutesEnd={dateMinutesEnd}
            thisDate={thisDate}
            Order={foundEvent}
          />
          <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <OrderSellerNavigationBar
              HandleProductButton={props.HandleProductButton}
              HandleOrderButton={props.HandleOrderButton}
            />
            <OrdersSellerBuyers
              Order={foundEvent.events_orders}
              setBuyerInfo={props.setBuyerInfo}
              buyerInfo={props.buyerInfo}
              buyerIndexi={props.buyerIndexi}
              setBuyerIndexi={props.setBuyerIndexi}
              SellerId={props.SellerId}
            />
          </Col>
        </>
      )
    }
  }
}

export default OrdersSellerSingleEvent

/*
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
      </>*/
