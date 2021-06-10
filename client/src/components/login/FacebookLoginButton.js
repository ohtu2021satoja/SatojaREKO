import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleLogin }) => (
  <Button
    onClick={() => handleLogin("111")}
    variant="primary"
    size="lg"
    type="submit"
    className="w-100 mb-4"
  >
    Kirjaudu Facebookilla
  </Button>
)
export default FacebookLoginButton
