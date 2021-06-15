import Toast from "react-bootstrap/Toast"

const NotificationPush = ({ icon, title, timeStamp, children }) => {
  const getTime = () => {
    const timeDifference = parseInt(
      (Math.abs(Date.now().getTime() - timeStamp.getTime()) / (1000 * 60)) % 60
    )

    switch (timeDifference) {
      case timeDifference > 60:
        return "yli tunti sitten"
      case timeDifference > 10 && timeDifference < 60:
        return "alle tunti sitten"
      case 1 < timeDifference && timeDifference < 10:
        return `${timeDifference} min sitten`
      default:
        return "hetki sitten"
    }
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
        minHeight: "100px",
      }}
    >
      <Toast
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <i>{icon}</i>
          <strong className="mr-auto">{title}</strong>
          <small>{getTime}</small>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </div>
  )
}

export default NotificationPush
