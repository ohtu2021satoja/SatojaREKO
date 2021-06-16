const EventInfoLabel = ({ event, classes, styles }) => {
  const startDate = new Date(event.start)
  const endDate = new Date(event.endtime)

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

  return (
    <div className="d-flex flex-column text-center">
      <p className={classes} style={styles}>
        {event.name} (REKO)
      </p>
      <p className={classes} style={styles}>
        {" "}
        {event.address}
      </p>
      <p className={classes} style={styles}>
        {startDate.getUTCDate() + "." + (startDate.getUTCMonth() + 1)}
      </p>
      <p className={classes} style={styles}>
        {startTime}-{endTime}
      </p>
    </div>
  )
}

export default EventInfoLabel
