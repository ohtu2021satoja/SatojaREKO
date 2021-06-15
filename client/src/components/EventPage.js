import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import EventPageListItem from "./EventPageListItem"

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

const EventPage = ({ event, closePage }) => {
  return (
    <Row className="">
      <Col xs={{ span: 12, offset: 0 }} className="mb-4 text-center">
        <Nav className="py-2">
          <Nav.Item>
            <Button
              variant="light"
              size="lg"
              className="mr-1"
              aria-label="Return to map"
              onClick={closePage}
            >
              <i className="bi bi-arrow-left" />
            </Button>
          </Nav.Item>
        </Nav>
      </Col>
      <Col xs={12} className="text-center mb-4">
        <h2 className="mb-4">Noutotilaisuus</h2>
        <div>
          <p>{event.name} (REKO)</p>
          <p>{event.address}</p>
          {(() => {
            const startDate = new Date(event.start)
            return <p>{startDate.getUTCDate() + "." + (startDate.getUTCMonth() + 1)}</p>
          })()}{" "}
        </div>
      </Col>
      <Col xs={12} className="mx-auto">
        {products.map((product, index) => (
          <EventPageListItem product={product} event={event} key={index} />
        ))}
      </Col>
    </Row>
  )
}

export default EventPage
