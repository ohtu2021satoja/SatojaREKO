import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import ArrowLeftIcon from "../../media/arrow-left.svg"
import FormSignUp from "./FormSignUp"
import PasswordResetButton from "./PasswordResetButton"

const SignUpPage = ({ user, handleSigned, handleRegisterUser }) => (
  <Row className="h-100">
    <Col xs={12}>
      <Nav className="py-2">
        <Nav.Item>
          <Button variant="light" size="lg" className="mr-1" onClick={handleSigned}>
            <img src={ArrowLeftIcon} width="24" height="24" alt="Return to login" />
          </Button>
        </Nav.Item>
      </Nav>
    </Col>
    <FormSignUp user={user} handleRegisterUser={handleRegisterUser} />
  </Row>
)

export default SignUpPage
