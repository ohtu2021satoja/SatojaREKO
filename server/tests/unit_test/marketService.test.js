const marketsService = require("../../services/markets")
const mockMarketsRepository = require("../mocks/mockMarketsRepository")

const mockMarkets= mockMarketsRepository.getAllMarkets()

describe("get all markets", () => {
    test("get all markets", async () => {
        const markets = await marketsService.getAllMarkets(mockMarketsRepository)
        expect(markets).toStrictEqual(mockMarkets)
    })})