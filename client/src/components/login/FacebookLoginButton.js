import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={() => handleLogin("111")}
      variant="primary"
      size="lg"
      type="submit"
      className="w-100 mb-4"
    >
      Kirjaudu Facebookilla
    </Button>
  </a>
)
export default FacebookLoginButton
