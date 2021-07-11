const axios = require("axios")

getAddressInfo = async (address, city) => {
  try {
    const key = process.env.GEO_API_KEY
    const current = encodeURIComponent(address + (city ? " " + city : ""))
    const url = `https://api.geoapify.com/v1/geocode/search?text=${current}&apiKey=${key}`
    const result = await axios.get(url)
    const lat = result.data.features[0].properties.lat
    const lon = result.data.features[0].properties.lon
    return [lat, lon]
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAddressInfo }
