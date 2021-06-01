const BLANK_IMAGE = "profile-blank_or75kg"

const updateSalesReportCheck = async (id, check, sellersRepository) => {
  await sellersRepository.updateSalesReportCheck(id, check)
}

const removeSellerImage = async (id, sellersRepository) => {
  await sellersRepository.updateSellersImage(id, BLANK_IMAGE)
}

module.exports = { updateSalesReportCheck, removeSellerImage }