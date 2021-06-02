import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"

const ProfilePageBuyer = () => {
  return (
    <Row className="mt-5 mx-2">
      <Col xs={12} className="mb-4 text-center">
        <h2 className="mb-4">Omat tiedot</h2>
        <div>
          <Image
            src="https://via.placeholder.com/300"
            className="mb-4"
            rounded
            fluid
            alt="User photo"
          />
        </div>
        <Button
          variant="outline-danger"
          size="lg"
          type="button"
          className="w-100"
          style={{ maxWidth: 300 }}
        >
          Poista kuva
        </Button>
      </Col>
      <Col xs={12} className="mb-5">
        <ListGroup>
          <ListGroup.Item>Etunimi</ListGroup.Item>
          <ListGroup.Item>Sukunimi</ListGroup.Item>
          <ListGroup.Item>Puhelinnumero</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col xs={12}>
        <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
        <Form>
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="newsletterCheck"
            label="Uutiskirje (max. 1 per viikko)"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="cancelOrderCheck"
            label="Ilmoitus, jos myyjä peruu tilauksen"
          />
        </Form>
      </Col>
    </Row>
  )
}

export default ProfilePageBuyer
