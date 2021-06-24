const parsePrice = (price) => {
  const priceString = String(price)
  let start = priceString.substr(0, priceString.length - 2)
  if(start===""){
    start="0"
  }
  const end = priceString.substr(priceString.length - 2)
  const resString = `${start},${end}€`
  return resString
}

module.exports = { parsePrice }