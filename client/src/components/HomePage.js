import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const HomePage = ({ logOut, setSellerView }) => (
  <Row className="d-flex align-content-center text-center h-100">
    <Col xs={12} className="mb-4">
      <Button
        onClick={() => setSellerView(false)}
        variant="outline-primary"
        size="lg"
        type="submit"
        className="w-75"
      >
        Ostan lähiruokaa
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        onClick={() => setSellerView(true)}
        variant="outline-primary"
        size="lg"
        type="submit"
        className="w-75"
      >
        Myyn lähiruokaa
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button variant="outline-success" size="lg" type="submit" className="w-75">
        Ota yhteyttä
      </Button>
    </Col>
    <Col xs={12} className="mb-4">
      <Button
        onClick={logOut}
        variant="outline-danger"
        size="lg"
        type="submit"
        className="w-75"
      >
        Kirjaudu ulos
      </Button>
    </Col>
  </Row>
)
export default HomePage
