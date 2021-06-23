import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleFacebookLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleFacebookLogin}
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
