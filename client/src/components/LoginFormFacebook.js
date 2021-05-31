import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const LoginFormFacebook = ({ handleLogin }) => {
  return (
    <Col>
      <Button
        onClick={() => handleLogin("111")}
        variant="primary"
        size="lg"
        type="submit"
        className="w-100"
      >
        Kirjaudu Facebookilla
      </Button>
    </Col>
  )
}

export default LoginFormFacebook
