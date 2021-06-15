import Toast from "react-bootstrap/Toast"
import Alert from "react-bootstrap/Alert"

// parent component sets the message and the length time it is shown
const NotificationSuccess = ({ messageSuccess }) => (
  <Toast>
    <Alert className="my-0" variant="success">
      {messageSuccess}
    </Alert>
  </Toast>
)

export default NotificationSuccess
