const getAllMarkets = async (marketsRepository) => {
    const markets = marketsRepository.getAllMarkets()
    return(markets)
}

module.exports = {getAllMarkets}