 
const db = require("../db")
const format = require("pg-format")


const updateSalesReportCheck = async (id, check) => {
  await db.query("UPDATE sellers SET salesreport_check = $1 WHERE id=$2", [check, id])
}

const updateSellersImage = async (id, image_url) => {
  await db.query("UPDATE sellers SET image_url = $1 WHERE id=$2 ", [image_url, id])
}

const addRekoAreas = async (seller_id, reko_areas) => {
  const values = reko_areas.map(reko_id => [seller_id, reko_id])
  const query = format("INSERT INTO sellers_reko (seller_id, reko_area_id) VALUES %L", values)
  await db.query(query,[])
}

const updateSellersInfo = async (seller_id, seller_info) => {
  await db.query("UPDATE sellers SET name=$1, homepage=$2, address=$3, zipcode=$4, city=$5, salesreport_check=$6, description=$7, location=$8 WHERE id=$9", [seller_info.name, seller_info.homepage, seller_info.address, seller_info.zipcode, seller_info.city, seller_info.salesreport_check, seller_info.description, `{"lat":"${seller_info.location[0]}","lon":"${seller_info.location[1]}"}`, seller_id])
}

const deleteRekoAreas = async (seller_id, reko_areas) => {
  await db.query("DELETE FROM sellers_reko WHERE seller_id=$1 AND reko_area_id = ANY($2::int[])", [seller_id, reko_areas])    
}

const createSeller = async (id, params) => {
  await db.query("INSERT INTO sellers VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",[id, params.name, params.homepage, params.address, params.zipcode, params.city, params.salesreport_check, params.description, params.image_url, `{"lat":"${params.location[0]}","lon":"${params.location[1]}"}`])
}

module.exports = { updateSalesReportCheck, updateSellersImage, addRekoAreas, deleteRekoAreas, updateSellersInfo, createSeller }