import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AppIcon from "../../media/satoja-logo.png"
import FacebookLoginButton from "./FacebookLoginButton"
import FacebookSignUpButton from "./FacebookSignUpButton"
import MockLoginButton from "./MockLoginButton"
import PasswordResetButton from "./PasswordResetButton"

const LoginPage = ({ handleFacebookLogin, handleFacebookSignUp, handleMockLogin }) => (
  <Row className="d-flex align-items-end h-100 mx-2">
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <div className="mb-5 pb-3 text-center">
        <img src={AppIcon} alt="Satoja" width="300" />
      </div>
      <FacebookLoginButton handleFacebookLogin={handleFacebookLogin} />
      <FacebookSignUpButton handleFacebookSignUp={handleFacebookSignUp} />
      <MockLoginButton handleMockLogin={handleMockLogin} />
      <PasswordResetButton />
    </Col>

    <Col xs={12} className="text-center">
      <p>Terms</p>
    </Col>
  </Row>
)

export default LoginPage
