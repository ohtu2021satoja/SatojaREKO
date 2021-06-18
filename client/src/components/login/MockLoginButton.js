import Button from "react-bootstrap/Button"

const MockLoginButton = ({ handleMockLogin }) => (
  <Button
    onClick={handleMockLogin}
    variant="outline-secondary"
    size="lg"
    type="submit"
    className="w-100 mt-4"
  >
    Vapaa pääsy
  </Button>
)
export default MockLoginButton
