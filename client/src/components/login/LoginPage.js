import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import TemplateTopNav from "../TemplateTopNav"
import FormLogin from "./FormLogin"
import FacebookLoginButton from "./FacebookLoginButton"

const LoginPage = ({ handleLogin }) => (
  <Row className="h-100">
    <TemplateTopNav
      navLink="/"
      altText="Palaa kotisivulle"
      navHeader="Kirjaudu palveluun"
    />
    <Col
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 6, offset: 3 }}
      lg={{ span: 4, offset: 4 }}
    >
      <FacebookLoginButton handleLogin={handleLogin} />
      <FormLogin handleLogin={handleLogin} />
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
