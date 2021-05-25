import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const HomePage = ({ logOut, setSellerView }) => (
  <div>
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
            <Button
              onClick={() => setSellerView(false)}
              variant="primary"
              size="lg"
              type="submit"
            >
              Ostan lähiruokaa
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4 text-center">
            <Button
              onClick={() => setSellerView(true)}
              variant="primary"
              size="lg"
              type="submit"
            >
              Myyn lähiruokaa
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4 text-center">
            <Button variant="success" size="lg" type="submit">
              Ota yhteyttä
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4 text-center">
            <Button onClick={logOut} variant="danger" size="lg" type="submit">
              Kirjaudu ulos
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
)
export default HomePage
