import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import AppIcon from "../../media/satoja-logo.png"
import FormLogin from "./FormLogin"
import FacebookLoginButton from "./FacebookLoginButton"
import MockLoginButton from "./MockLoginButton"

const LoginPage = ({ handleLogin, handleSigned, handleMockLogin }) => (
  <Row className="h-100 bg-light-yellow px-2 align-items-end">
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <div className="my-3 text-center">
        <Image src={AppIcon} alt="Satoja" className="mb-2" fluid />
        <h3>Tunne tuottaja!</h3>
      </div>
      <FormLogin handleSigned={handleSigned} handleLogin={handleLogin} />
      <FacebookLoginButton handleLogin={handleLogin} />
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
