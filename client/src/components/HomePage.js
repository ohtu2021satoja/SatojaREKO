import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

const HomePage = ({ logOut }) => (
  <Row className="d-flex align-content-center text-center h-100 bg-light-gray">
    <Col xs={12} className="mb-4 mx-auto pt-3 w-50 home-sign">
      <p className="mb-0">Kun on satoja</p>
      <p>saa aikaan</p>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        as={Link}
        to={{
          pathname: "/map",
        }}
        variant="blue"
        size="lg"
        type="button"
        className="w-75"
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
        variant="blue"
        size="lg"
        type="button"
        className="w-75"
      >
        Myyn lähiruokaa
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button variant="success" size="lg" type="button" className="w-75">
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
      >
        Kirjaudu ulos
      </Button>
    </Col>
  </Row>
)

export default HomePage
