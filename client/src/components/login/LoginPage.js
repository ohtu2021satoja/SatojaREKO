import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FacebookLoginButton from "./FacebookLoginButton"
import FacebookSignUpButton from "./FacebookSignUpButton"

const LoginPage = ({ signed, handleLogin, handleSignUp }) => (
  <Row className="d-flex align-items-end h-100 mx-2">
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <FacebookLoginButton handleLogin={handleLogin} />
      {!signed && <FacebookSignUpButton handleSignUp={handleSignUp} />}
    </Col>

    <Col xs={12} className="text-center">
      <p>Terms</p>
    </Col>
  </Row>
)

export default LoginPage
