import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import OrderSellerEventList from "./OrderSellerEventList"
import OrdersSellerSingleEvent from "./OrdersSellerSingleEvent"
import Row from "react-bootstrap/esm/Row"
import OrdersSellerTitle from "./OrdersSellerTitle"
import OrderSellerNav from "./OrderSellerNav"

import BuyerInfo from "./BuyerInfo"
import orderService from "../services/orders"
import { getSellerOrders } from "../reducers/sellerOrders"

const OrderSeller = () => {
  const [Orders, setOrders] = useState([])
  const id = useSelector((state) => state.authedUser.id)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const serverEvents = await orderService.getSellerOrders(id)
      setOrders(serverEvents)
    }
    fetchData()
  }, [id])
  dispatch(getSellerOrders(Orders))

  const Orderasd = useSelector((state) => state.sellerOrders)
  var paivamaarat = []

  const getPaivat = (event) => {
    const date = new Date(event.event_start)
    if (paivamaarat.length === 0) {
      paivamaarat.push(date)
    }
    for (var i = 0; i < paivamaarat.length; i++) {
      if (
        paivamaarat[i].getDay() !== date.getDay() &&
        paivamaarat[i].getMonth() !== date.getMonth() &&
        paivamaarat[i].getFullYear() === date.getFullYear()
      ) {
        paivamaarat.push(date)
      }
    }
  }

  Orderasd.map(getPaivat)

  const [eventId, setEventId] = useState(null)
  const [listView, setListView] = useState(true)
  const [buyerInfo, setBuyerInfo] = useState(null)
  const [buyerIndexi, setBuyerIndexi] = useState(null)

  const HandleOrderButton = () => {
    setListView(false)
  }

  const HandleProductButton = () => {
    setListView(true)
  }

  const HandleBackButton = () => {
    setEventId(null)
  }

  if (eventId === null) {
    return (
      <Row className="h-100 mb-5 flex-column bg-light-purple">
        <OrdersSellerTitle />
        <OrderSellerEventList
          paivamaarat={paivamaarat}
          Orderasd={Orderasd}
          setEventId={setEventId}
          eventId={eventId}
        />
      </Row>
    )
  } else {
    const event = Orderasd.find((x) => x.event_id === eventId)
    const user = event.events_orders.find((x) => x.user_id === buyerIndexi)
    if (buyerInfo) {
      return (
        <Row className="h-100 mb-5 flex-column">
          <OrderSellerNav
            navLink="/orders/seller"
            navHeader=""
            altText="Palaa tilaajalistalle"
            HandleBackButton={HandleBackButton}
          />
          <BuyerInfo setBuyerInfo={setBuyerInfo} buyerIndexi={buyerIndexi} user={user} />
        </Row>
      )
    }
    return (
      <Row className="h-100 mb-5 flex-column bg-light-purple">
        <OrdersSellerSingleEvent
          setEventId={setEventId}
          eventId={eventId}
          setListView={setListView}
          ListView={listView}
          setBuyerInfo={setBuyerInfo}
          buyerInfo={buyerInfo}
          HandleBackButton={HandleBackButton}
          HandleProductButton={HandleProductButton}
          HandleOrderButton={HandleOrderButton}
          buyerIndexi={buyerIndexi}
          setBuyerIndexi={setBuyerIndexi}
          Orderasd={Orderasd}
          SellerId={id}
        />
      </Row>
    )
  }
}

export default OrderSeller
