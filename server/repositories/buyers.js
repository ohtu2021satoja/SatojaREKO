const db = require("../db")

const updateBuyersInfo = async (buyer_id, buyer_info) => {
  await db.query("UPDATE buyers SET cancel_notification_check=$1, newsletter_check=$2 WHERE id=$3", [buyer_info.cancel_notification_check, buyer_info.newsletter_check, buyer_id])
}

const updateBuyersImage = async (id, image_url) => {
  await db.query("UPDATE buyers SET image_url = $1 WHERE id=$2 ", [image_url, id])
}

const createBuyer = async (id, params) => {
  await db.query("INSERT INTO buyers VALUES ($1,$2,$3,$4);",[id, false, false, params.image_url])
}


module.exports = { updateBuyersInfo, updateBuyersImage, createBuyer }