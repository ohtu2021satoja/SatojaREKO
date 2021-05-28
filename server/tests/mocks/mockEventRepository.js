const productEventTable = []

const getProductEventTable = () => {
  return(productEventTable)
}

const addProductToEvents = (product_id, eventIDs) => {
  eventIDs.forEach(event => {
    productEventTable.push((product_id,event))
  })
}

module.exports = { getProductEventTable, addProductToEvents}