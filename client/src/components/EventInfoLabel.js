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
      <div className="d-flex flex-column">
        <p className={classes} style={styles}>
          {(() => {
            let marketType = ""
            if (market.type === "reko_market") marketType = " (REKO)"
            if (market.reko_name) return market.reko_name + marketType
            if (market.name) return market.name + marketType
            else return "Noutotilaisuus" + marketType
          })()}
        </p>
        <p className={classes} style={styles}>
          {" "}
          {market.address}
        </p>
        {!omitDate && (
          <p className={classes} style={styles}>
            {startDay} {startDate.getUTCDate() + "." + (startDate.getUTCMonth() + 1)}
          </p>
        )}
        <p className={classes} style={styles}>
          {startTime}-{endTime}
        </p>
      </div>
    )
  )
}

export default EventInfoLabel
