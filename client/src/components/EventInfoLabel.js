import Card from "react-bootstrap/Card"

const EventInfoLabel = ({ market, event, classes, styles, omitDate }) => {
  const startDate = new Date(event.start ? event.start : event.event_start)
  const endDate = new Date(event.endtime ? event.endtime : event.event_endtime)

  const weekdays = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ]

  const startTime =
    startDate.getHours() +
    ":" +
    (startDate.getMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes())

  const endTime =
    endDate.getHours() +
    ":" +
    (endDate.getMinutes() < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes())

  const startDay = weekdays[startDate.getDay()]

  return (
    market && (
      <Card.Body>
        <Card.Text className={classes} style={styles}>
          Noutotilaisuus
        </Card.Text>
        {market.city && (
          <Card.Text className={classes} style={styles}>
            {market.city}
          </Card.Text>
        )}
        <Card.Text className={classes} style={styles}>
          {" "}
          {market.address}
        </Card.Text>
        {!omitDate && (
          <Card.Text className={classes} style={styles}>
            {startDay} {startDate.getDate() + "." + (startDate.getMonth() + 1)}
          </Card.Text>
        )}
        <Card.Text className={classes} style={styles}>
          {startTime}-{endTime}
        </Card.Text>
      </Card.Body>
    )
  )
}

export default EventInfoLabel
