import { useState } from "react"
import OrderSellerEventList from "./OrderSellerEventList"
import OrdersSellerSingleEvent from "./OrdersSellerSingleEvent"
import OrdersSellerTitle from "./OrdersSellerTitle"

const OrderSeller = () => {
  // example products
  const orderers = [
    {
      name: "John Dillinger",
      id: 189226,
    },
    {
      name: "Bonnie Parker",
      id: 367979,
    },
    {
      name: "Clyde Barrow",
      id: 2235235,
    },
  ]
  // example products
  const orderProducts = [
    {
      name: "mansikka 5kg laatikko",
      sold: 5,
      soldlimit: 10,
      price: 52,
      image: "https://www.satotukku.fi//i/t/mansikka.8ee8a02c75.jpg",
    },
    {
      name: "herne 1 litra",
      sold: 3,
      soldlimit: 15,
      price: 23,
      image: "http://www.hankkija.fi/Liitetiedostot/Pics/herneetw900.jpg",
    },
    {
      name: "naudan sisäfile",
      sold: 2,
      soldlimit: 4,
      price: 66,
      image: "https://www.wotkins.fi/wp-content/uploads/2016/05/naudan_sisafilee.jpg",
    },
  ]
  // example events
  const Events = [
    {
      name: "Mikkeli (REKO)",
      address: "porkkalankatu 6",
      date: "1996-12-31 18:30:00",
      id: 0,
    },
    {
      name: "testi = mikkeli (REKO)",
      address: "Porrassalmenkatu 67",
      date: "1996-12-31 18:30:00",
      id: 1,
    },
    {
      name: "testi2 (REKO)",
      address: "Brahentie 33",
      date: "2000-7-12 17:30:00",
      id: 2,
    },
    {
      name: "testi3 (REKO)",
      address: "Savontie 1",
      date: "2021-6-9 17:30:00",
      id: 3,
    },
    {
      name: "testi4 (REKO)",
      address: "salotie 13",
      date: "2004-7-11 11:00:00",
      id: 4,
    },
    {
      name: "testi5 (REKO)",
      address: "esplanadinkatu 2",
      date: "2000-6-12 17:30:00",
      id: 5,
    },
    {
      name: "testi6 (REKO)",
      address: "mannerheimintie 4",
      date: "2000-5-12 17:30:00",
      id: 6,
    },
    {
      name: "testi7 (REKO)",
      address: "väinö tannerintie 12",
      date: "2000-5-10 17:30:00",
      id: 7,
    },
    {
      name: "testi8 (REKO)",
      address: "Braku 3",
      date: "2021-7-12 12:30:00",
      id: 8,
    },
  ]
  // dates to array
  let Dates = [Events[0].date]

  for (let i = 1; i < Events.length; i++) {
    Dates.push(Events[i].date)
  }
  //filter unique dates
  const uniqueDates = Dates.filter((value, index) => {
    return Dates.indexOf(value) === index
  })
  //filtering old dates

  // sorting them
  uniqueDates.sort()

  const [eventId, setEventId] = useState(null)
  const [listView, setListView] = useState(true)
  const [buyerInfo, setBuyerInfo] = useState(null)

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
      <div>
        <OrdersSellerTitle />
        <OrderSellerEventList
          Events={Events}
          Event={Events[eventId]}
          setEventId={setEventId}
          eventId={eventId}
          setListView={setListView}
          ListView={listView}
          orderProducts={orderProducts}
          orderers={orderers}
          setBuyerInfo={setBuyerInfo}
          buyerInfo={buyerInfo}
          HandleBackButton={HandleBackButton}
          HandleProductButton={HandleProductButton}
          HandleOrderButton={HandleOrderButton}
          uniqueDates={uniqueDates}
        />
      </div>
    )
  } else {
    return (
      <div>
        <OrdersSellerSingleEvent
          Events={Events}
          Event={Events[eventId]}
          setEventId={setEventId}
          eventId={eventId}
          setListView={setListView}
          ListView={listView}
          orderProducts={orderProducts}
          orderers={orderers}
          setBuyerInfo={setBuyerInfo}
          buyerInfo={buyerInfo}
          HandleBackButton={HandleBackButton}
          HandleProductButton={HandleProductButton}
          HandleOrderButton={HandleOrderButton}
          uniqueDates={uniqueDates}
        />
      </div>
    )
  }
}

export default OrderSeller