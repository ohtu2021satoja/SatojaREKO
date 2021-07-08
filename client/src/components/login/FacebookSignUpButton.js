import Button from "react-bootstrap/Button"

const FacebookSignUpButton = ({ handleLoginWithFacebook }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleLoginWithFacebook}
      variant="facebook"
      size="lg"
      type="button"
      className="mb-3 w-100"
    >
      Rekisteröidy Facebookilla
    </Button>
  </a>
)

export default FacebookSignUpButton
