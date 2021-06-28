import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

const HomePage = ({ logOut }) => (
  <Row className="d-flex align-content-center text-center h-100">
    <Col xs={12} className="mb-4">
      <Button
        as={Link}
        to={{
          pathname: "/map",
        }}
        variant="outline-primary"
        size="lg"
        type="button"
        className="w-75"
        id="buyer-button"
      >
        Ostan lähiruokaa
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        as={Link}
        to={{
          pathname: "/home",
        }}
        variant="outline-primary"
        size="lg"
        type="button"
        className="w-75"
        id="seller-button"
      >
        Myyn lähiruokaa
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        variant="outline-success"
        size="lg"
        type="button"
        className="w-75"
        id="contact-button"
      >
        Ota yhteyttä
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        onClick={logOut}
        variant="outline-danger"
        size="lg"
        type="button"
        className="w-75"
        id="logout-button"
      >
        Kirjaudu ulos
      </Button>
    </Col>
  </Row>
)

export default HomePage
