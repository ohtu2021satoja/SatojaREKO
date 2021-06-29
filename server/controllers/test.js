const testRouter = require('express').Router()
const db=require("../db")

testRouter.post('/reset', async (request, response) => {
  db.query("delete from users")
  db.query("delete from admins")
  db.query("delete from buyers")
  db.query("delete from sellers")
  response.status(204).end()
})

module.exports = testRouter