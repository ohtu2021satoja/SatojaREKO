const productsService = require("../services/products")
const mockProductRepository = require("./mocks/mockProductRepository")
const mockEventRepository = require("./mocks/mockEventRepository")

const mockProducts = mockProductRepository.getAllProducts()

describe("get all products", () => {
  test("returns all products", async () => {
    const products = await productsService.getAllProducts(mockProductRepository)
    expect(products).toStrictEqual(mockProducts)
  })
})

describe("get sellers products", () => {
  test("returns sellers products when there are products", async () => {
    const products = await productsService.getSellersProducts(1, mockProductRepository)
    
    expect(products).toStrictEqual(mockProducts.filter(product => product.sellers_id == 1))
  })
})

describe("adding product", () => {
  test("adding product works", async () => {
    const product = {
      name: "TestiMansikka",
      organic: false,
      sellers_id: 2,
      type: "pc",
      batch_quantity: 3,
      created_at: "2021-05-22T08:57:16.631Z",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?",
      imageURL: "Testimansikkakuva",
      category: "Marjat ja hedelmät"
    }
    const lengthBefore = mockProducts.length
    const events = [1,2]
    await productsService.addProduct(product, events, mockProductRepository, mockEventRepository)
    const newMockProducts = mockProductRepository.getAllProducts()
    expect(newMockProducts.length).toBe(lengthBefore+1)
    expect(mockEventRepository.getProductEventTable()).toStrictEqual([(5,1), (5,2)])
  })
})