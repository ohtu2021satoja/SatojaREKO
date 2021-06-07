 
const db = require("../db")

const updateSalesReportCheck = async (id, check) => {
  await db.query("UPDATE sellers SET salesreport_check = $1 WHERE id=$2", [check, id])
}

const updateSellersImage = async (id, image_url) => {
  await db.query("UPDATE sellers SET image_url = $1 WHERE id=$2 ", [image_url, id])
}

const addRekoAreas = async (seller_id, reko_areas) => {
  reko_areas.forEach(reko_id => {
    await db.query("INSERT INTO sellers_reko VALUES($1,$2)", [seller_id, reko_id])    
  });
}

const updateSellersInfo = async (seller_id, seller_info) => {
  await db.query("UPDATE sellers SET name=$1, home_page=$2, address=$3, zipcode=$4, city=$5, salesreport_check=$6, description=$7 WHERE id=$8", [seller_info.name, seller_info.home_page, seller_info.address, seller_info.zipcode, seller_info.city, seller_info.salesreport_check, seller_info.description, seller_id])
}

const deleteRekoAreas = async (seller_id, reko_areas) => {
  await db.query("DELETE from sellers_reko WHERE seller_id = $1 AND reko_area_id IN $2", [seller_id, reko_areas])
}

module.exports = { updateSalesReportCheck, updateSellersImage, addRekoAreas, deleteRekoAreas, updateSellersInfo }