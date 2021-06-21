import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"

const BackButtonHeader = ({ linkTo }) => (
  <Col xs={{ span: 12, offset: 0 }} className="mb-4 text-center">
    <Nav className="py-2">
      <Nav.Item>
        <Button
          variant="light"
          size="lg"
          className="mr-1"
          aria-label="Return to previous page"
          as={Link}
          to={linkTo}
        >
          <i className="bi bi-arrow-left" />
        </Button>
      </Nav.Item>
    </Nav>
  </Col>
)

export default BackButtonHeader
