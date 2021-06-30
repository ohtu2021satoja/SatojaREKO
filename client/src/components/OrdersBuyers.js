
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useState } from "react"
import OrdersBuyersProducts from "./OrdersBuyersProducts"
import OrdersBuyersNav from "./OrdersBuyersNav"

const OrdersBuyers = () => {
  // example events
  const Events = [
    {
      name: "Mikkeli (REKO)",
      address: "porkkalankatu 6",
      date: "2021-6-14 18:30:00",
      id: 0,
    },
    {
      name: "testi (REKO)",
      address: "Porrassalmenkatu 67",
      date: "2021-9-12 18:30:00",
      id: 1,
    },
    {
      name: "testi2 (REKO)",
      address: "Brahentie 33",
      date: "2021-6-11 17:30:00",
      id: 2,
    },
    {
      name: "testi3 = testi2 (REKO)",
      address: "Savontie 1",
      date: "2021-7-12 17:30:00",
      id: 3,
    },
    {
      name: "testi4 (REKO)",
      address: "salotie 13",
      date: "2021-7-11 11:00:00",
      id: 4,
    },
    {
      name: "testi5 (REKO)",
      address: "esplanadinkatu 2",
      date: "2021-8-12 17:30:00",
      id: 5,
    },
    {
      name: "testi6 (REKO)",
      address: "mannerheimintie 4",
      date: "2021-8-1 17:30:00",
      id: 6,
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

  const HandleBackButton = () => {
    setEventId(null)
  }

  const RenderEvents = (tapahtuma, index) => {
    var date = new Date(tapahtuma.date)

    if (eventId === null) {
      return (
        <Card
          key={index}
          className="mb-1 border border-1 border-secondary"
          onClick={() => setEventId(tapahtuma.id)}
        >
          <Card.Body>
            <Card.Text className="mb-0">{tapahtuma.name}</Card.Text>
            <Card.Text className="mb-0">{tapahtuma.address}</Card.Text>
            <Card.Text className="mb-0">
              {date.getHours()}:{date.getMinutes()} -
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }

  const Paivamaarat = (date, index) => {
    // sorting events by date
    var date1 = new Date(date)
    const tapahtumat = []
    for (let i = 0; i < Events.length; i++) {
      var date2 = new Date(Events[i].date)
      if (
        date2.getDate() === date1.getDate() &&
        date2.getMonth() === date1.getMonth() &&
        date2.getFullYear() === date1.getFullYear()
      ) {
        tapahtumat.push(Events[i])
      }
    }
    if (eventId === null) {
      return (
        <Col
          key={index}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
        >
          <h4 className="mb-0 pt-3">
            {date1.getDate()}.{date1.getMonth() + 1}.{date1.getFullYear()}
          </h4>
          {tapahtumat.map(RenderEvents)}
        </Col>
      )
    }
  }
  if (eventId === null) {
    return (
      <Row className="h-100 mb-5 flex-column bg-light-green">
        <Col xs={12} className="mt-5 mb-2 py-2 text-center">
          <h2>Noudot</h2>
          <h3>Tulevat noudot</h3>
        </Col>
        {uniqueDates.map(Paivamaarat)}
      </Row>
    )
  } else {
    const x = Events.find((y) => y.id === eventId)
    const date = new Date(x.date)
    const dateHour = date.getHours()
    var dateMinutes = date.getMinutes()
    const month = date.getMonth() + 1
    const thisDate = date.getDate()
    var paiva = date.getDay()
    var datepaiva
    if (paiva === 0) {
      datepaiva = "Sunnuntai"
    }
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
    if (dateMinutes === 0) {
      dateMinutes = "00"
    }
    console.log("dateminutes ", dateMinutes + "0")

    console.log("paiva ", paiva)
    console.log("datepaiva ", datepaiva)
    return (
      <Row className="h-100 mb-5 flex-column bg-light-green">
        <OrdersBuyersNav
          navLink="/orders/buyer"
          navHeader="Tilaisuus"
          altText="Palaa noutoihin"
          HandleBackButton={HandleBackButton}
        />
        <Col xs={12} className="py-4 text-center">
          <h4 className="mb-0">{x.name}</h4>
          <p className="mb-0">
            {datepaiva} {thisDate}.{month}.
          </p>
          <p className="mb-0">
            {dateHour}:{dateMinutes} -
          </p>
          <p>{x.address}</p>
          <p className="mb-0">Tilausnumero</p>
          <p>5243522</p>
        </Col>
        <Col xs={12}>
          <OrdersBuyersProducts
            Event={Events[eventId]}
            setEventId={setEventId}
            eventId={eventId}
          />
        </Col>
      </Row>
    )
  }
}

export default OrdersBuyers
