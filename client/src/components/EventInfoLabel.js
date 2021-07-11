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
    startDate.getUTCHours() +
    ":" +
    (startDate.getUTCMinutes() < 10
      ? "0" + startDate.getUTCMinutes()
      : startDate.getUTCMinutes())
  const endTime =
    endDate.getUTCHours() +
    ":" +
    (endDate.getUTCMinutes() < 10
      ? "0" + endDate.getUTCMinutes()
      : endDate.getUTCMinutes())

  const startDay = weekdays[startDate.getUTCDay()]

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
            {startDay} {startDate.getUTCDate() + "." + (startDate.getUTCMonth() + 1)}
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
