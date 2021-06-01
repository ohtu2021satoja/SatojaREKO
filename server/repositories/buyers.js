const db = require("../db")

const updateNewsLetterCheck = async (id, check) => {
  await db.query("UPDATE buyers SET newsletter_check = $1 WHERE id=$2", [check, id])
}

const updateCancelNotificationCheck = async (id, check) => {
  await db.query("UPDATE buyers SET cancel_notification_check = $1 WHERE id=$2", [check, id])
}

const updateBuyersImage = async (id, image_url) => {
  await db.query("UPDATE buyers SET image_url = $1 WHERE id=$2 ", [image_url, id])
}


module.exports = { updateNewsLetterCheck, updateCancelNotificationCheck, updateBuyersImage }