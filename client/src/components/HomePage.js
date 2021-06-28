import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

const HomePage = ({ logOut }) => (
  <Row className="h-100 bg-field align-content-center text-center">
    <Col xs={12} className="mb-4 mx-auto pt-4 pb-2 home-sign">
      <p className="mb-0">Kun on satoja</p>
      <p>saa aikaan</p>
    </Col>
    <Col xs={12} className="mb-4">
      <Button as={Link} to={{ pathname: "/map" }} className="point-left">
        <div className="point-left-inner">
          <h2 className="point-content">Ostan lähiruokaa</h2>
        </div>
      </Button>
    </Col>
    <Col xs={12} className="mb-5">
      <Button as={Link} to={{ pathname: "/home" }} className="point-right">
        <div className="point-right-inner">
          <h2 className="point-content">Myyn lähiruokaa</h2>
        </div>
      </Button>
    </Col>
    <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} className="mb-4">
      <Button variant="success" size="lg" type="button" className="w-75">
        Ota yhteyttä
      </Button>
    </Col>
    {/*<Col xs={12} className="mt-auto mb-4">
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
    </Col>*/}
  </Row>
)

export default HomePage

/*<Col xs={12} className="mb-4">
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
*/
