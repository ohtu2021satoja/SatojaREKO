import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import axios from "axios"
import eventService from "../services/events"
import marketService from "../services/markets"
import BootStrapForm from "react-bootstrap/Form"
import rekoService from "../services/reko"
import Dropdown from "react-bootstrap/Dropdown"
import EventListAdmin from "./EventListAdmin"

// Yup

const EventForm = ({ setAddingEvent }) => {
  const validationSchema = Yup.object().shape({
    starting_time: Yup.string().required("Vaadittu"),
    end_time: Yup.string().required("Vaadittu"),
    date: Yup.string().required("Vaadittu"),
  })
  const [markets, setMarkets] = useState([
    { id: 10, address: "Ståhlentie 14, espoo", type: "reko_market" },
    { id: 21, address: "Hämeentie 1", type: "reko_market" },
  ])
  const [market, setMarket] = useState(null)

  useEffect(async () => {
    const response = await axios.get("api/markets")
    setMarkets(response.data)
  }, [])
  const handleSubmit = async ({ starting_time, end_time, date }) => {
    console.log(date)
    const current_date = new Date()
    const current_year = current_date.getUTCFullYear()
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

    await eventService.addEvent(startingDateObject, endDateObject, market.id)

    console.log(startingDateObject)
    console.log(endDateObject)
    setAddingEvent(false)
  }
  console.log(markets)
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          starting_time: "",
          end_time: "",
          date: "",
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
            <Button variant="danger" onClick={() => setAddingEvent(false)}>
              Peruuta
            </Button>
            <Button type="submit">Lähetä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const SelectMarket = ({ market, setMarket, markets }) => {
  const displayMarkets = markets.map((market) => (
    <Dropdown.Item onClick={() => setMarket(market)}>{market.address}</Dropdown.Item>
  ))
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {market ? market.address : "Valitse noutopaikka"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{displayMarkets}</Dropdown.Menu>
      </Dropdown>
    </div>
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

const RekoForm = ({ setAddingReko }) => {
  const handleSubmit = async ({ area, name }) => {
    await rekoService.addRekoArea({ area, name })
    setAddingReko(false)
  }
  const validationSchema = Yup.object().shape({
    area: Yup.string().required("Vaadittu"),
    name: Yup.string().required("Vaadittu"),
  })
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          area: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <RekoFormDetails />
            </Row>
            <Button variant="danger" onClick={() => setAddingReko(false)}>
              Peruuta
            </Button>
            <Button type="submit">Lähetä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const RekoFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="area" id="area" label="Alue" component={FormFieldText} />
      <ErrorMessage name="area" component={FormErrorMessage} />
      <Field name="name" id="name" label="Nimi" component={FormFieldText} />
      <ErrorMessage name="nimi" component={FormErrorMessage} />
    </Col>
  )
}

const RekoCheckBox = ({ reko_area, rekoChoices, setRekoChoices }) => {
  const handleCheck = (id) => {
    if (rekoChoices.includes(id)) {
      setRekoChoices([])
    } else {
      setRekoChoices([id])
    }
  }
  return (
    <BootStrapForm.Check
      type="radio"
      name="flexRadioDefault"
      label={reko_area.name}
      onChange={() => handleCheck(reko_area.id)}
    />
  )
}

const RekoAreas = ({ setRekoChoices, rekoAreas, rekoChoices }) => {
  const checkboxes = rekoAreas.map((reko_area) => (
    <div class="form-check">
      <RekoCheckBox
        key={reko_area.id}
        reko_area={reko_area}
        rekoChoices={rekoChoices}
        setRekoChoices={setRekoChoices}
      />
    </div>
  ))
  return <div> {checkboxes} </div>
}

const MarketForm = ({ setAddingMarket }) => {
  const [rekoAreas, setRekoAreas] = useState([
    { id: 1, name: "Ristiina" },
    { id: 2, name: "Mikkeli" },
  ])
  const [rekoChoices, setRekoChoices] = useState([])
  useEffect(async () => {
    const result = await axios.get("https://satoja-reko.herokuapp.com/api/reko_areas")
    setRekoAreas(result.data)
  }, [])
  const handleSubmit = async ({ address }) => {
    console.log(address)
    await marketService.addMarket(address, rekoChoices)
  }
  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Vaadittu"),
  })
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <MarketFormDetails />
              <RekoAreas
                rekoAreas={rekoAreas}
                rekoChoices={rekoChoices}
                setRekoChoices={setRekoChoices}
              />
            </Row>
            <Button variant="danger" onClick={() => setAddingMarket(false)}>
              Peruuta
            </Button>
            <Button type="submit">Lähetä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const MarketFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="address" id="address" label="address" component={FormFieldText} />
      <ErrorMessage name="address" component={FormErrorMessage} />
    </Col>
  )
}

const ModifyEvents = ({ setModifyingEvents }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      market_id: 2,
      address: "Hämeentie 1",
    },
  ])
  useEffect(() => {
    const fetchData = async () => {
      const events = await axios.get("/api/events")
      setEvents(events.data)
    }
    fetchData()
  })
  return (
    <div>
      <EventListAdmin events={events} />
    </div>
  )
}

const AdminPage = () => {
  const [addingEvent, setAddingEvent] = useState(false)
  const [addingMarket, setAddingMarket] = useState(false)
  const [addingReko, setAddingReko] = useState(false)
  const [modifyingEvents, setModifyingEvents] = useState(false)
  return (
    <div>
      <Button onClick={() => setAddingEvent(true)}>Lisää tapahtuma</Button>
      <Button onClick={() => setAddingMarket(true)}>Lisää noutopaikka</Button>
      <Button onClick={() => setAddingReko(true)}>Lisää Reko-alue</Button>
      <Button onClick={() => setModifyingEvents(true)}>Muokkaa tapahtumaa</Button>
      {addingMarket ? <MarketForm setAddingMarket={setAddingMarket} /> : null}
      {addingEvent ? <EventForm setAddingEvent={setAddingEvent} /> : null}
      {addingReko ? <RekoForm setAddingReko={setAddingReko} /> : null}
      {modifyingEvents ? <ModifyEvents setModifyingEvents={setModifyingEvents} /> : null}
    </div>
  )
}

export default AdminPage
