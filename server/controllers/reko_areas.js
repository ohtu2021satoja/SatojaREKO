const rekoAreasRouter = require('express').Router()
const rekoAreasRepository = require("../repositories/reko_areas")
const rekoAreasService = require("../services/reko_areas")




rekoAreasRouter.get('/', async (req, res) => {
  const reko_areas = await rekoAreasService.getRekoAreas(rekoAreasRepository)
  res.send(reko_areas)
})

module.exports = rekoAreasRouter