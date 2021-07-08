import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

const PasswordResetButton = () => (
  <Link to="/passwordreset">
    <Button
      as={Link}
      to="/new-password"
      variant="link"
      type="button"
      size="lg"
      className="m-0 pl-1 py-1 text-decoration-none"
    >
      Unohtuiko salasana?
    </Button>
  </Link>
)

export default PasswordResetButton
