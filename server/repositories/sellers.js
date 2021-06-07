 
const db = require("../db")

const updateSalesReportCheck = async (id, check) => {
  await db.query("UPDATE sellers SET salesreport_check = $1 WHERE id=$2", [check, id])
}

const updateSellersImage = async (id, image_url) => {
  await db.query("UPDATE sellers SET image_url = $1 WHERE id=$2 ", [image_url, id])
}

module.exports = { updateSalesReportCheck, updateSellersImage }