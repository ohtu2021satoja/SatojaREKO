
const db = require("../db")

const getRekoAreas = () => {
  const reko_areas = db.query("SELECT * from reko_areas;")
  return reko_areas
}

module.exports = { getRekoAreas }