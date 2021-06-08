const db = require('../db')
const {isEmpty} = require('../utils/validation')

const getUser = async (id) => {
    let getUserQuery = 'SELECT * FROM users WHERE id=$1 OR facebook_id=$1'
    
    const user = await db.query(getUserQuery, [id])

    console.log('get use by id ', user)
    return(user)
}

const createUser = async (userData) => {
  console.log('createUser repository');
    try {
        const { firstName, lastName, email, facebookId} = userData
        let createUserQuery = ''
        let values = [firstName, lastName, facebookId]

        if (isEmpty(email)) {
          createUserQuery = 'INSERT INTO users (firstname, lastname, facebook_id) VALUES($1, $2, $3) RETURNING *'
        } else {
          createUserQuery = 'INSERT INTO users (firstname, lastname, email, facebook_id) VALUES($1, $2, $3, $4) RETURNING *'
          values.push(email)
        }

        const newUser = await db.query(createUserQuery, values)

        console.log('new user created', newUser)
        return newUser
    } catch (err) {
        console.log('error =====>', err)
    }
}

module.exports = { getUser, createUser }