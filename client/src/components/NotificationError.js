import Toast from "react-bootstrap/Toast"
import Alert from "react-bootstrap/Alert"

// parent component sets the message and the length time it is shown
const NotificationError = ({ messageError }) => (
  <Toast>
    <Alert className="my-0" variant="danger">
      {messageError}
    </Alert>
  </Toast>
)

export default NotificationError
