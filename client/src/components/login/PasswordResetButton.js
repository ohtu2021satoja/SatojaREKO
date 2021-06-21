import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

const PasswordResetButton = () => (
  <Link to="/passwordreset">
    <Button variant="outline-primary" size="lg" type="submit" className="w-100">
      Palauta salasana
    </Button>
  </Link>
)

export default PasswordResetButton
