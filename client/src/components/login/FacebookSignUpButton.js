import Button from "react-bootstrap/Button"

const FacebookSignUpButton = ({ handleFacebookSignUp }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleFacebookSignUp}
      variant="primary"
      size="lg"
      type="button"
      className="w-100 mb-3"
    >
      Rekisteröidy Facebookilla
    </Button>
  </a>
)

export default FacebookSignUpButton
