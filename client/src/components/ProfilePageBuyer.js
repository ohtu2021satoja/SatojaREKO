import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"

const ProfilePageBuyer = () => {
  return (
    <Row style={{ paddingTop: 70, paddingBottom: 70 }}>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
      >
        <Row>
          <Col xs={12} className="mb-4 text-center">
            <h3 className="mb-4">Omat tiedot</h3>
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
              style={{ width: "100%", maxWidth: 300 }}
              variant="outline-danger"
              size="lg"
              type="button"
            >
              Poista kuva
            </Button>
          </Col>
          <Col xs={12} className="mb-4">
            <ListGroup>
              <ListGroup.Item>Etunimi</ListGroup.Item>
              <ListGroup.Item>Sukunimi</ListGroup.Item>
              <ListGroup.Item>Puhelinnumero</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} className="mb-4">
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
      </Col>
    </Row>
  )
}

export default ProfilePageBuyer
