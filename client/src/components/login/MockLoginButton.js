import Button from "react-bootstrap/Button"

const MockLoginButton = ({ handleMockLogin }) => (
  <Button
    onClick={handleMockLogin}
    variant="outline-secondary"
    size="lg"
    type="button"
    className="w-100 mb-3"
  >
    Vapaa pääsy
  </Button>
)
export default MockLoginButton
