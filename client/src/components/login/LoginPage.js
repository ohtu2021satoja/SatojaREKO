import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FacebookLoginButton from "./FacebookLoginButton"
import FacebookSignUpButton from "./FacebookSignUpButton"
import MockLoginButton from "./MockLoginButton"

const LoginPage = ({ handleFacebookLogin, handleFacebookSignUp, handleMockLogin }) => (
  <Row className="d-flex align-items-end h-100 mx-2">
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <FacebookLoginButton handleFacebookLogin={handleFacebookLogin} />
      <FacebookSignUpButton handleFacebookSignUp={handleFacebookSignUp} />
      <MockLoginButton handleMockLogin={handleMockLogin} />
    </Col>

    <Col xs={12} className="text-center">
      <p>Terms</p>
    </Col>
  </Row>
)

export default LoginPage
