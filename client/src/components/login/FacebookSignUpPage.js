import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import FormSignUp from "./FormSignUp"

const FacebookSignUpPage = ({ user, handleSignUp }) => {
  return (
    <Row className="h-100">
      <Col xs={12}>
        <Nav className="py-2">
          <Nav.Item>
            <Button
              variant="light"
              size="lg"
              className="mr-1"
              ariaLabel="Return to login page"
              onClick={handleSignUp}
            >
              <i class="bi bi-arrow-left" />
            </Button>
          </Nav.Item>
        </Nav>
      </Col>
      <FormSignUp user={user} />
    </Row>
  )
}

export default FacebookSignUpPage
