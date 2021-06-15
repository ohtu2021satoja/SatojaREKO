const getRekoAreas = async (rekoAreasRepository) => {
  const reko_areas = await rekoAreasRepository.getRekoAreas()
  return reko_areas
}

const addRekoAreas = async (rekoArea, rekoAreasRepository) => {
  const newRekoArea = await rekoAreasRepository.addRekoAreas(rekoArea)
}

const addRekoMarkets = async (reko_areas, market_id, rekoAreasRepository) => {
  const newRekoMarkets = await rekoAreasRepository.addRekoMarkets(reko_areas, market_id, rekoAreasRepository)
}

module.exports = { getRekoAreas, addRekoAreas, addRekoMarkets }