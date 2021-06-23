import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import AppIcon from "../../media/satoja-logo.png"
import FormLogin from "./FormLogin"
import FacebookLoginButton from "./FacebookLoginButton"
import MockLoginButton from "./MockLoginButton"
import PasswordResetButton from "./PasswordResetButton"

const LoginPage = ({ handleFacebookLogin, handleSigned, handleMockLogin }) => (
  <Row className="d-flex align-items-end h-100 mx-2">
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <div className="my-5 text-center">
        <img src={AppIcon} alt="Satoja" width="300" className="mb-2" />
        <h3 className="text-muted">Tunne tuottaja!</h3>
      </div>
      <FormLogin handleSigned={handleSigned} />
      <FacebookLoginButton handleFacebookLogin={handleFacebookLogin} />
      <MockLoginButton handleMockLogin={handleMockLogin} />
    </Col>

    <Col xs={12} className="mt-auto text-center">
      <a
        href="https://satoja.fi/dokumentit/tietosuojaseloste.html"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link">Tietosuoja</Button>
      </a>
    </Col>
  </Row>
)

export default LoginPage
