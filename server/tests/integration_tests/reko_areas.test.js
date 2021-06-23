const supertest = require('supertest')
const app = require('../../app')
const helper = require("./helper")
const rekoAreasRepository = require("../../repositories/reko_areas")

const api = supertest(app)

const newRekoArea = {
  name: 'Ristiina',
  area: "Etelä-Savo"
}

beforeEach(async () => {
  await helper.eraseRekoAreas()
})

beforeAll(async () => {
  await helper.createUsers()
})

describe("can add reko_areas", () => {
  test("can't add reko_area if not logged in" , async () => {

    await api
      .post('/api/reko_areas')
      .send(newRekoArea)
      .expect(401)
  })

  test("can't add reko_area if not logged in" , async () => {
  
    await api
      .post('/api/reko_areas')
      .send(newRekoArea)
      .expect(401)
  })

  test("can add reko_area if not admin", async () => {
    const cookie = await helper.login(api, helper.user_cred)
    await api
      .post('/api/reko_areas')
      .set('cookie',cookie)
      .send(newRekoArea)
      .expect(401)
  })

  test("can add reko_area if admin", async () => {
    const cookie = await helper.login(api, helper.admin_cred)
    await api
      .post('/api/reko_areas')
      .set('cookie',cookie)
      .send(newRekoArea)
      .expect(200)
  })
})

describe("can get reko_areas", () => {
  beforeEach( async () => {
    await rekoAreasRepository.addRekoAreas(newRekoArea)
  })
  test("/api/reko/areas returns reko areas", async () => {
    const reko_areas = await api.
      get("/api/reko_areas")
    
    expect(reko_areas.body.length).toBe(1)
    expect(reko_areas.body[0].name).toBe(newRekoArea.name)
  })
})

describe("")
