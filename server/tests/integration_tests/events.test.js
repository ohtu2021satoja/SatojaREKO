const supertest = require('supertest')
const app = require('../../app')
const helper = require("./helper")
const eventsRepository = require('../../repositories/events')
const eventsService = require ('../../services/events')
const marketsService = require("../../services/markets")
const marketsRepository = require("../../repositories/markets")
const rekoAreasRepository = require("../../repositories/reko_areas")

const api = supertest(app)

const newEvent = {
    market_id: 1,
    start: "2021-08-30 16:30:00",
    end: "2021-08-30 16:30:00",
}

beforeAll(async () => {
    await helper.createUsers()
})

beforeEach(async () => {
    await helper.eraseEvents()
    //await helper.eraseMarkets()
})

describe("can add events", () => {
    test("can't add events if not logged in" , async () => {

        await api
            .post('/api/events')
            .send(newEvent)
            .expect(401)
    })

    test("can't add event if not admin" , async () => {

        const cookie = await helper.login(api, helper.user_cred)

        await api
            .post('/api/events')
            .send(newEvent)
            .set('cookie', cookie)
            .expect(401)
    })


    test("can add event if admin", async () => {

        const cookie = await helper.login(api, helper.admin_cred)

        console.log(cookie)

        await api
            .post('/api/events')
            .send(newEvent)
            .set('cookie', cookie)
            .expect(200)

        const events = await eventsRepository.getOnlyEvents()
        expect(events.length).toBe(1)
        expect(events[0].market_id).toBe(1)
    })
})

describe("can get events", () => {
    beforeEach(async () => {
        const market_id = await marketsService.addMarkets({address: "Hämeentie 1", type: "reko_market" }, [1], marketsRepository, rekoAreasRepository)
        console.log("ID", market_id)
        await eventsService.addEvent({market_id, start: "2021-08-30 16:30:00", end: "2021-08-30 16:30:00"}, eventsRepository)
    })
    test("/api/events returns all events", async () => {
        const event = await eventsRepository.getOnlyEvents()
        const response = await api
            .get("/api/events")


        expect(response.body.length).toBe(1)
        expect(response.body[0].market_id).toBe(event[0].market_id)
    })
})

afterAll(async () => {
    await helper.eraseMarkets()
})