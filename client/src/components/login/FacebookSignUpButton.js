import Button from "react-bootstrap/Button"

const FacebookSignUpButton = ({ handleFacebookSignUp }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleFacebookSignUp}
      variant="outline-primary"
      size="lg"
      type="submit"
      className="w-100"
    >
      Rekisteröidy Facebookilla
    </Button>
  </a>
)

export default FacebookSignUpButton
