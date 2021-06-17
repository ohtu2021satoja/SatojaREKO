import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventInfoLabel from "./EventInfoLabel"
import EventPageListItem from "./EventPageListItem"
import BackButtonHeader from "./BackButtonHeader"
import { useParams } from "react-router-dom"

const products = [
  {
    id: 14,
    name: "Omenoita",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 9,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "Halpoja omenoita",
    close_before_event: 24,
    unit_price: 500,
    image_url: "porkkana_okbtuk",
    category: "Hedelmät & marjat",
    quantity_left: "7",
    sizes: [{ id: 36, quantity: 7, unit: 1.25 }],
  },
  {
    id: 11,
    name: "Kalakukkova",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 15,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "hyvvee kukkova",
    close_before_event: 24,
    unit_price: 750,
    image_url: "porkkana_okbtuk",
    category: "Leivät & leivonta",
    quantity_left: "7",
    sizes: [
      { id: 1, quantity: 10, unit: 0.5 },
      { id: 2, quantity: 5, unit: 1.0 },
    ],
  },
  {
    id: 3,
    name: "Mansikkaa",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 12,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "mansikoita",
    close_before_event: 24,
    unit_price: 1500,
    image_url: "porkkana_okbtuk",
    category: "Hedelmät & marjat",
    quantity_left: "7",
    sizes: [{ id: 34, quantity: 12, unit: 1.0 }],
  },
]

const EventPage = (props) => {
  const { eventID } = useParams()

  const event = props.location.state.event

  console.log("eventID: " + eventID)

  return (
    <Row>
      <BackButtonHeader
        linkTo={{
          pathname: "/map",
        }}
      />
      <Col xs={12} className="text-center mb-4">
        <h2 className="mb-4">Noutotilaisuus</h2>
        <EventInfoLabel event={event} classes="mb-0" styles={{ fontSize: 16 }} />
      </Col>
      <Col xs={12} className="mx-auto">
        {products.map((product, index) => (
          <EventPageListItem
            product={product}
            event={event}
            openProductPage={() => {}}
            closeProductPage={() => {}}
            key={index}
          />
        ))}
      </Col>
    </Row>
  )
}

export default EventPage
