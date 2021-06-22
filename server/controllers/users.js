const usersRouter = require('express').Router()
const usersService = require("../services/users")
const buyersService = require("../services/buyers")
const sellersService = require("../services/sellers")


const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")
usersRouter.put("/:id/password", async (req, res, next) => {
  const { id } = req.params
  if(! req.user || req.user.id != id){
    res.status(401).send("Current user doesn't match")
  } else{
    try{
      const { old_password, new_password } = req.body
      console.log(old_password)
      await usersService.updateOldPassword( req.user, old_password, new_password, usersRepository)
      res.send("Ok") 
    } catch(error){
      next(error)
    }
  }

})

usersRouter.get("/:id/reset_password", async (req, res, next) => {
  const { id } = req.params
  try{
      const { passwordHash } = req.query
      await usersService.setUserPasswordHash( id, passwordHash, usersRepository)
      res.redirect("/")
    } catch(error){
      next(error)
    }
})

usersRouter.get("/", async (req, res) => {
  res.send(req.query)
})

usersRouter.put('/:id', async (req, res) => {
  const { id } = req.params

  if(! req.user || req.user.id != id){
    res.status(401).send("Current user doesn't match")
  } else{
    if(req.body.seller_update){
      await sellersService.updateSellersInfo(id, req.body, sellersRepository, usersRepository)
    } else {
      await buyersService.updateBuyersInfo(id, req.body, buyersRepository, usersRepository)
    }
    await usersRepository.updateUsersInfo(id, req.body.user_info)
    res.sendStatus(200).end()
  }

})

usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  if(! req.user || req.user.id != id){
    res.status(401).send("Current user doesn't match")
  } else{
    await sellersService.deleteUser(id, usersRepository)
    res.sendStatus(200)
  }


})

usersRouter.post("/", async (req, res) => {
  await usersService.createUser(req.body, usersRepository, sellersRepository, buyersRepository )
  res.sendStatus(200)
})


usersRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const user = await usersService.getUser(id, usersRepository)
    if (!user) {
        return res.status(404).send({ error: 'User not found' })
    }
    try {
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
})

usersRouter.get("/current/user", async (req, res, next) => {
  console.log("REQ USER", req.user)
  if(!req.user){
    return res.send(null)
  }
  const user = await usersService.getUser(req.user.id, usersRepository)
  console.log("REQ USER",req.user)
  console.log("USER",user)
  if (!user) {
      res.send(req.user)
  } else {
    res.send(user)
  }
})

module.exports = usersRouter
