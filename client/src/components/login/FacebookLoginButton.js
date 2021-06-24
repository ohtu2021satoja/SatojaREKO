import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleLogin}
      variant="primary"
      size="lg"
      type="button"
      className="w-100 mb-3"
    >
      Kirjaudu Facebookilla
    </Button>
  </a>
)
export default FacebookLoginButton
