const usersRouter = require('express').Router()
const db = require("../services/db")


usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await  db.query("SELECT * from users WHERE id=$1",[id]);
  console.log(user)
  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }
  try {
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter