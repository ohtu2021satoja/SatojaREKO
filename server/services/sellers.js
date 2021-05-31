const updateSalesReportCheck = async (id, check, sellersRepository) => {
  await sellersRepository.updateSalesReportCheck(id, check)
}

module.exports = { updateSalesReportCheck }