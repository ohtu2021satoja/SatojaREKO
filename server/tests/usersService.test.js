const usersService = require("../services/users")
const mockUsersRepository = require("./mocks/mockUsersRepository")

const mockUsers = mockUsersRepository.getAllUsers()

describe("get user", () => {
  test("get user by id", async () => {
    const user = await usersService.getUser(1, mockUsersRepository)
    
    expect(user).toStrictEqual(mockUsers.filter(user => user.id == 1))
  })
})