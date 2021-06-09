import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useState } from "react"
import OrdersBuyersProducts from "./OrdersBuyersProducts"

const OrdersBuyers = () => {
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
      name: "testi3 = testi2 (REKO)",
      address: "Savontie 1",
      date: "2000-7-12 17:30:00",
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

  const HandleBackButton = () => {
    setEventId(null)
  }

  const RenderEvents = (tapahtuma, index) => {
    var date = new Date(tapahtuma.date)

    if (eventId === null) {
      return (
        <Card
          as={Col}
          key={index}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
          onClick={() => setEventId(tapahtuma.id)}
        >
          <div>tapahtuma {tapahtuma.name}</div>
          {tapahtuma.address}
          <div>
            aika {date.getHours()}:{date.getMinutes()}-
          </div>
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
        <div key={index}>
          <Row className="mt-3">
            <Col className="text-center">
              <h6>
                {date1.getDate()}.{date1.getMonth() + 1}.{date1.getFullYear()}
              </h6>
            </Col>
          </Row>
          {tapahtumat.map(RenderEvents)}
        </div>
      )
    }
  }
  if (eventId === null) {
    return (
      <div>
        <Col xs={12} className="text-center mb-4">
          <h2>Noudot</h2>
        </Col>
        <Col className="text-center mb-4">
          <h4>Tulevat noudot</h4>
        </Col>
        {uniqueDates.map(Paivamaarat)}
      </div>
    )
  } else {
    const x = Events.find((y) => y.id === eventId)
    const helptime = x.date.split(" ")
    const helpDate = helptime[0].split("-")
    const hourMinuteSecond = helptime[1].split(":")
    const month = helpDate[1]
    const day = helpDate[2]
    return (
      <Row className="mt-5">
        <Col xs={12} className="text-center mb-4">
          <h2>Tilaisuus</h2>
        </Col>
        <Col xs={12} className="text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            className="bi bi-arrow-left-circle"
            onClick={HandleBackButton}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              className="bi bi-arrow-left-circle"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </Col>
        <Col xs={12} className="text-center">
          <h6>{x.name}</h6>
        </Col>
        <Col xs={12} className="text-center">
          <h6>
            generic weekday {day}.{month}.
          </h6>
        </Col>
        <Col xs={12} className="text-center">
          <h6>
            {hourMinuteSecond[0]}:{hourMinuteSecond[1]}-
          </h6>
        </Col>
        <Col xs={12} className="text-center mb-4">
          <h6>{x.address}</h6>
        </Col>
        <Col xs={12} className="text-center">
          <h5>Tilausnumero</h5>
        </Col>
        <Col xs={12} className="text-center mb-4">
          <h5>5243522</h5>
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
