import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"

const ProfilePageSeller = () => {
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
              <ListGroup.Item>Yrityksen / Tilan nime</ListGroup.Item>
              <ListGroup.Item>Etunimi</ListGroup.Item>
              <ListGroup.Item>Sukunimi</ListGroup.Item>
              <ListGroup.Item>Puhelinnumero</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={12} className="m-4">
            <div className="text-center">
              <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
              <h6 className="mb-4">Etelä-Savo</h6>
            </div>
            <Form>
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
              <Form.Check
                className="mb-3"
                type="checkbox"
                id="location1Check"
                label="Juva"
              />
            </Form>
          </Col>
          <Col xs={12} className="mb-4">
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
      </Col>
    </Row>
  )
}

export default ProfilePageSeller
