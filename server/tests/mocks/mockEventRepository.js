const productEventTable = []

const events = [
  {
    id: 1,
    market_id: 1,
    start: "2021-05-26T13:11:47.683Z",
    endtime: "2021-05-26T13:11:47.683Z",
    area: "Etelä-Savo",
    address: "Mannerheimintie 1",
    type: "reko_market",
    areas_id: 1,
    name: "Ristiina",
    seller_id: 1,
    reko_area_id: 1,
    homepage: "www.john.fi",
    zipcode: "00100",
    county: "Uusimaa",
    salesreport_check: true,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit ipsum, adipisci delectus amet commodi ex!",
    sellerimageurl: "johnimage"
    }
  ]

const getProductEventTable = () => {
  return(productEventTable)
}

const addProductToEvents = (product_id, eventIDs) => {
  eventIDs.forEach(event => {
    productEventTable.push((product_id,event))
  })
}

const getSellersEvents = (id) => {
  return(events.filter(event => event.seller_id === id))
}

const getAllEvents = () => {
  return(events)
}

module.exports = { getProductEventTable, addProductToEvents, getSellersEvents, getAllEvents}

