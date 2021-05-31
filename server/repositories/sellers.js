const db = require("../db")

const updateSalesReportCheck = async (id, check) => {
  await db.query("UPDATE sellers SET salesreport_check = $1 WHERE id=$2", [check, id])
}

module.exports = { updateSalesReportCheck }
