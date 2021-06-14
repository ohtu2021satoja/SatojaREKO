const users = [
    {
        id: 4,
        firstname: 'Jane',
        lastname: 'Doe',
        created_at: '2021-05-22T07:50:20.047Z',
        phonenumber: '+358407654321',
        email: 'janedoe@email.com',
        password: 'test1234',
        is_user: false,
        is_seller: false
    },
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        created_at: '2021-05-22T07:50:20.047Z',
        phonenumber: '+358401234567',
        email: 'johndoe@email.com',
        password: 'test1234',
        is_user: false,
        is_seller: false
    }
]

const getAllUsers = () => {
    return(users)
}

const getUser = (id) => {
    const result = users.filter(user => user.id == id)
    return(result)
}

module.exports = { getAllUsers, getUser }