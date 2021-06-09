const getRekoAreas = async (rekoAreasRepository) => {
  const reko_areas = await rekoAreasRepository.getRekoAreas()
  return reko_areas
}

module.exports = { getRekoAreas }