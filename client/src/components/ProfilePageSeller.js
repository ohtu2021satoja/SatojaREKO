import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"

const ProfilePageSeller = () => {
  return (
    <Row className="mt-5 mx-2">
      <Col xs={12} className="mb-4 text-center">
        <h2 className="mb-4">Omat tiedot</h2>
        <div className="mb-4">
          <Image src="https://via.placeholder.com/300" rounded fluid alt="User photo" />
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
          <ListGroup.Item>Yrityksen / Tilan nimi</ListGroup.Item>
          <ListGroup.Item>Etunimi</ListGroup.Item>
          <ListGroup.Item>Sukunimi</ListGroup.Item>
          <ListGroup.Item>Puhelinnumero</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col xs={12}>
        <div className="text-center">
          <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
          <h6 className="mb-4">Etelä-Savo</h6>
        </div>
        <Form className="mb-5">
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Ristiina"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Mikkeli"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Mäntyharju"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Puumala"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Pertunmaa"
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="location1Check"
            label="Pieksämäki"
          />
          <Form.Check className="mb-3" type="checkbox" id="location1Check" label="Juva" />
        </Form>
      </Col>
      <Col xs={12}>
        <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
        <Form>
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="orderReportCheck"
            label="Lähetä tilaisuuskohtainen myyntiraportti, kun tilausaika on umpeutunut"
          />
        </Form>
      </Col>
    </Row>
  )
}

export default ProfilePageSeller
