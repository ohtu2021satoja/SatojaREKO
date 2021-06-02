import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginFormFacebook from "./LoginFormFacebook"

const LoginPage = ({ handleLogin }) => {
  return (
    <Row className="d-flex align-items-end h-100 mx-4">
      <LoginFormFacebook handleLogin={handleLogin} />
      <Col xs={12} className="text-center">
        <p>Terms</p>
      </Col>
    </Row>
  )
}

export default LoginPage
