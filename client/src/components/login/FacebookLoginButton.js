import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleFacebookLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleFacebookLogin}
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
