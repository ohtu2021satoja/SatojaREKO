import Button from "react-bootstrap/Button"

const SignUpButton = ({ handleSigned }) => (
  <Button
    onClick={handleSigned}
    variant="outline-success"
    size="lg"
    type="button"
    className="w-100 mb-3"
  >
    Rekisteröidy
  </Button>
)

export default SignUpButton
