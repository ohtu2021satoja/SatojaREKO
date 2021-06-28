const supertest = require('supertest')
const app = require('../../app')
const helper = require("./helper")
const marketsService = require("../../services/markets")
const marketsRepository = require("../../repositories/markets")
const rekoAreasRepository = require("../../repositories/reko_areas")

const api = supertest(app)

const newMarket = {
  address: 'Hämeentie 1',
  type: "reko_market",
  reko_areas: [1]
}

beforeAll(async () => {
  await helper.createUsers()
})

beforeEach(async () => {
  await helper.eraseMarkets()
})

describe("can add markets", () => {
  test("can't add market if not logged in" , async () => {

    await api
      .post('/api/markets')
      .send(newMarket)
      .expect(401)
  })
  
  test("can't add market if not admin" , async () => {
  
    const cookie = await helper.login(api, helper.user_cred)
  
    await api
      .post('/api/markets')
      .send(newMarket)
      .set('cookie', cookie)
      .expect(401)
  })
  
  
  test("can add market if admin", async () => {

    const cookie = await helper.login(api, helper.admin_cred)
    
    console.log(cookie)
    
    await api
      .post('/api/markets')
      .send(newMarket)
      .set('cookie', cookie)
      .expect(200)
  
    const markets = await api.get("/api/markets")
    expect(markets.body.length).toBe(1)
    expect(markets.body[0].address).toBe("Hämeentie 1")
  })
})

describe("can get markets", () => {
  beforeEach(async () => {
    await marketsService.addMarkets({address: "Hämeentie 1", type: "reko_market" }, [1], marketsRepository, rekoAreasRepository)
  })
  test("/api/markets returns all markets", async () => {

    const response = await api
      .get("/api/markets")

    
    expect(response.body.length).toBe(1)
    expect(response.body[0].address).toBe("Hämeentie 1")
  })
})