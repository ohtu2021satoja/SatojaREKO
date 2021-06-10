const rekoAreasRouter = require('express').Router()
const rekoAreasRepository = require("../repositories/reko_areas")
const rekoAreasService = require("../services/reko_areas")

rekoAreasRouter.get('/', async (req, res) => {
  const reko_areas = await rekoAreasService.getRekoAreas(rekoAreasRepository)
  res.send(reko_areas)
})

rekoAreasRouter.post('/', async (req,res) => {
  try {
    const newRekoArea = req.body
    rekoAreasService.addRekoAreas(newRekoArea, rekoAreasRepository)
    res.sendStatus(200).end()
  } catch (err) {
    console.log(err)
    next(err)
  }
})

rekoAreasRouter.post('/markets/:id', async (req,res) => {
  try {
    const {id} = req.params
    rekoAreasService.addRekoAreas(id, req.body, rekoAreasRepository)
    res.sendStatus(200).end()
  } catch (err) {
    console.log(err)
    next(err)
  }
})



module.exports = rekoAreasRouter