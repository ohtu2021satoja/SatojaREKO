const db = require("../db")

const updateNewsLetterCheck = async (id, check) => {
  await db.query("UPDATE buyers SET newsletter_check = $1 WHERE id=$2", [check, id])
}

const updateCancelNotificationCheck = async (id, check) => {
  await db.query("UPDATE buyers SET cancel_notification_check = $1 WHERE id=$2", [check, id])
}


module.exports = { updateNewsLetterCheck, updateCancelNotificationCheck }