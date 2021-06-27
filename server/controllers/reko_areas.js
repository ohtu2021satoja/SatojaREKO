const rekoAreasRouter = require('express').Router()
const rekoAreasRepository = require("../repositories/reko_areas")
const rekoAreasService = require("../services/reko_areas")
const usersService = require("../services/users")
const usersRepository = require("../repositories/users")

rekoAreasRouter.get('/', async (req, res) => {
  const reko_areas = await rekoAreasService.getRekoAreas(rekoAreasRepository)
  res.send(reko_areas)
})

rekoAreasRouter.post('/', async (req,res) => {
  if(req.user && await usersService.isAdmin(req.user.id, usersRepository)){
    try {
      const newRekoArea = req.body
      rekoAreasService.addRekoAreas(newRekoArea, rekoAreasRepository)
      res.sendStatus(200).end()
    } catch (err) {
      console.log(err)
      next(err)
    }
  } else{
    res.status(401).send("Current user isn't admin")
  }

})

module.exports = rekoAreasRouter