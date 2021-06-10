const getRekoAreas = async (rekoAreasRepository) => {
  const reko_areas = await rekoAreasRepository.getRekoAreas()
  return reko_areas
}

const addRekoAreas = async (rekoArea, rekoAreasRepository) => {
  const newRekoArea = await rekoAreasRepository.addRekoAreas(rekoArea)
}

const addRekoMarkets = async (market_id, rekoAreas, rekoAreasRepository) => {
  const newRekoMarkets = await rekoAreasRepository.addRekoMarkets(market_id, req_body, rekoAreasRepository)
}

module.exports = { getRekoAreas, addRekoAreas }