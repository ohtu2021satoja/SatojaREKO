const testRouter = require('express').Router()
const db=require("../db")

testRouter.post('/reset', async (request, response) => {
  db.query("delete from users")
  response.status(204).end()
})

module.exports = testRouter