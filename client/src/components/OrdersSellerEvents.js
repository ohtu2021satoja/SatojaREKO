import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Link } from "react-router-dom"


const OrdersSellerEvents = () => {
    // example events
    const events = [
      {
        name: "Mikkeli (REKO)",
        address: "Porrassalmenkatu 67",
        date: "1996-12-31 18:30:00"
      },
      {
        name: "testi = mikkeli (REKO)",
        address: "Porrassalmenkatu 67",
        date: "1996-12-31 18:30:00"
      },
      {
        name: "testi2 (REKO)",
        address: "Brahentie 33",
        date: "2000-7-12 17:30:00"
      },
      {
        name: "testi3 = testi2 (REKO)",
        address: "Savontie 1",
        date: "2000-7-12 17:30:00"
      },
      {
        name: "testi4 (REKO)",
        address: "Savontie 1",
        date: "2004-7-11 11:00:00"
      },
      {
        name: "testi5 (REKO)",
        address: "Brahentie 33",
        date: "2000-6-12 17:30:00"
      },
      {
        name: "testi6 (REKO)",
        address: "Brahentie 33",
        date: "2000-5-12 17:30:00"
      },
      {
        name: "testi7 (REKO)",
        address: "Brahentie 33",
        date: "2000-5-10 17:30:00"
      },
    ]
    // dates to array
    let Dates = [events[0].date]

    for (let i = 1; i < events.length; i++){
      Dates.push(events[i].date)
    }
    //filter unique dates
    const uniqueDates = Dates.filter((value,index) =>{
        return Dates.indexOf(value) === index
    })
    // sorting them
    uniqueDates.sort()

    const renderEvents = (tapahtuma, index) => {
      var date = new Date(tapahtuma.date)
      return(
        <Link to="/orderproducts">
          <Card
          as={Col}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
          key={index}>
            
            <div>
              tapahtuma {tapahtuma.name}
            </div>
            {tapahtuma.address}
            <div>
              aika {date.getHours()}:{date.getMinutes()}-

            </div>
          </Card>
          </Link>
      )
    }

    const paivamaarat = (date, index) => {
      // filtering events by date
      var date1 = new Date(date)
      const apuva = []
      for (let i = 0; i < events.length; i++){
        var date2 = new Date(events[i].date)
        if (date2.getDate() === date1.getDate()){
          if (date2.getMonth() === date1.getMonth()){
            if (date2.getFullYear() === date1.getFullYear()){
              apuva.push(events[i])
            }
          }
        }
      }
      return (
        <div
        key={index}>
          <Row 
          className="justify-content-md-center"
          >
          {date1.getDate()}.{date1.getMonth()+1}.{date1.getFullYear()}
          </Row>
          {apuva.map(renderEvents)}
        </div>
      )
    }
  return(
      <div>
        <Row className="justify-content-md-center"
        >
          <h1>Tilaukset</h1>
        </Row>
        {uniqueDates.map(paivamaarat)}
      </div>
  )
}

export default OrdersSellerEvents