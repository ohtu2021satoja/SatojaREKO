import Col from "react-bootstrap/Col"
import React, { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import * as Yup from "yup"
import axios from "axios"
import eventService from "../services/events"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import SelectMarket from "./SelectMarket"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import { Field, ErrorMessage } from "formik"

const EventListAdmin = ({ events }) => {
  const sortByTime = (eventsArray) => {
    return eventsArray.sort((a, b) => {
      return new Date(a.start) - new Date(b.start)
    })
  }

  const getEventsByDate = (eventsArray) => {
    const sortedArray = sortByTime(eventsArray)
    const eventsByDate = {}
    sortedArray.forEach((event) => {
      const date = new Date(event.start)
      const dateKey =
        "" + date.getUTCFullYear() + (date.getUTCMonth() + 1) + date.getUTCDate()
      eventsByDate[dateKey] = eventsByDate[dateKey]
        ? eventsByDate[dateKey].concat(event)
        : [event]
    })
    return eventsByDate
  }

  const eventsByDate = getEventsByDate(events)

  const getDateString = (event) => {
    const date = new Date(event.start)
    return (
      "" +
      date.getUTCDate() +
      "." +
      (date.getUTCMonth() + 1) +
      "." +
      date.getUTCFullYear()
    )
  }

  return (
    <Col xs={12} className="text-left mb-4">
      {Object.keys(eventsByDate).map((day, index) => {
        return (
          <div key={index}>
            <p className="mt-4">{getDateString(eventsByDate[day][0])}</p>
            {eventsByDate[day].map((event, index) => (
              <EventListItemAdmin event={event} key={index} />
            ))}
          </div>
        )
      })}
    </Col>
  )
}
// import { Link } from "react-router-dom"

const EventListItemAdmin = ({ event }) => {
  const [show, setShow] = useState(false)
  return (
    <Card className="mb-1 py-2 px-2">
      <Button onClick={() => setShow(true)}>Muokkaa</Button>
      <EventInfoLabelAdmin event={event} classes="mb-0" omitDate={true} />
      {show ? <EventForm setShow={setShow} event={event} /> : null}
    </Card>
  )
}
const EventForm = ({ setShow, event }) => {
  const validationSchema = Yup.object().shape({
    starting_time: Yup.string().required("Vaadittu"),
    end_time: Yup.string().required("Vaadittu"),
    date: Yup.string().required("Vaadittu"),
  })
  const [markets, setMarkets] = useState([
    { id: 10, address: "Ståhlentie 14, espoo", type: "reko_market" },
    { id: 21, address: "Hämeentie 1", type: "reko_market" },
  ])
  const [market, setMarket] = useState({ address: event.address, id: event.market_id })
  console.log(market)

  useEffect(async () => {
    const response = await axios.get("api/markets")
    setMarkets(response.data)
  }, [])
  const handleSubmit = async ({ starting_time, end_time, date }) => {
    console.log(starting_time, end_time)
    const current_date = new Date()
    const current_year = current_date.getFullYear()
    const [day, monthA] = date.split(".")
    const month = parseInt(monthA) - 1
    const starting_hour = starting_time.split(":")[0]
    const starting_minutes = starting_time.split(":")[1]
    const startingDateObject = new Date(
      Date.UTC(current_year, month, day, starting_hour, starting_minutes)
    )

    const end_hour = end_time.split(":")[0]
    const end_minutes = end_time.split(":")[1]

    const endDateObject = new Date(
      Date.UTC(current_year, month, day, end_hour, end_minutes)
    )

    await eventService.updateEvent(startingDateObject, endDateObject, market.id, event.id)

    console.log(startingDateObject)
    console.log(endDateObject)
    setShow(false)
  }
  console.log(markets)
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          starting_time: `${new Date(event.start).getUTCHours()}:${new Date(
            event.start
          ).getMinutes()}`,
          end_time: `${new Date(event.endtime).getUTCHours()}:${new Date(
            event.endtime
          ).getMinutes()}`,
          date: `${new Date(event.start).getUTCDate()}.${
            new Date(event.start).getUTCMonth() + 1
          }`,
          market_address: event.address,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <EventFormDetails />
              <SelectMarket market={market} setMarket={setMarket} markets={markets} />
            </Row>
            <Button
              variant="danger"
              onClick={() => {
                console.log("peruuta")
                setShow(false)
              }}
            >
              Peruuta
            </Button>
            <Button type="submit">Päivitä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const EventFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field
        name="starting_time"
        id="staring_time"
        label="Aloitus aika"
        component={FormFieldText}
      />
      <ErrorMessage name="starting_time" component={FormErrorMessage} />
      <Field
        name="end_time"
        id="end_time"
        label="Lopetus aika"
        component={FormFieldText}
      />
      <ErrorMessage name="end_time" component={FormErrorMessage} />
      <Field name="date" id="date" label="Päivä" component={FormFieldText} />
      <ErrorMessage name="date" component={FormErrorMessage} />
    </Col>
  )
}

const EventInfoLabelAdmin = ({ event }) => {
  const startDate = new Date(event.start)
  const endDate = new Date(event.endtime)

  const weekdays = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ]

  const startTime =
    startDate.getUTCHours() +
    ":" +
    (startDate.getUTCMinutes() < 10
      ? "0" + startDate.getUTCMinutes()
      : startDate.getUTCMinutes())
  const endTime =
    endDate.getUTCHours() +
    ":" +
    (endDate.getUTCMinutes() < 10
      ? "0" + endDate.getUTCMinutes()
      : endDate.getUTCMinutes())

  const startDay = weekdays[startDate.getUTCDay()]

  return (
    <div>
      <p>
        {startDay} {startDate.getUTCDate() + "." + (startDate.getUTCMonth() + 1)}
      </p>
      <p>
        {startTime}-{endTime}
      </p>
    </div>
  )
}

export default EventListAdmin
