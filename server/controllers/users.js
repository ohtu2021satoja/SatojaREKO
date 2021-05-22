const usersRouter = require('express').Router()
const users = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    created_at: Date.now(),
    phonenumber: '+358401234567',
    email: 'johndoe@email.com',
    password: 'test1234',
    imageUrl: 'random',
    newsletter_check: false,
    cancel_notification_check: false,
    name: 'Reko',
    homepage: 'www.satoja.fi',
    address: 'Mannerheimintie 1',
    zipcode: 00100,
    county: 'Uusimaa',
    salesreport_check: true,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit ipsum, adipisci delectus amet commodi ex!',
    location: '60.167488615063796, 24.94343472522525'
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    created_at: Date.now(),
    phonenumber: '+358401234567',
    email: 'johndoe@email.com',
    password: 'test1234',
    imageUrl: 'random',
    newsletter_check: false,
    cancel_notification_check: false,
    name: 'Reko',
    homepage: 'www.satoja.fi',
    address: 'Mannerheimintie 1',
    zipcode: 00100,
    county: 'Uusimaa',
    salesreport_check: true,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit ipsum, adipisci delectus amet commodi ex!',
    location: '60.167488615063796, 24.94343472522525'
  },
]

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id == id)

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