const products = [
    {
        id: 2,
        name: 'Naudan Sisäfilee',
        organic: true,
        sellers_id: 1,
        type: 'kg',
        batch_quantity: 2,
        created_at: '2021-05-22T08:57:16.631Z',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?',
        imageURL: 'sisäfileekuva',
        category: 'Liha'
    },
    {
        id: 1,
        name: 'Mansikka',
        organic: true,
        sellers_id: 2,
        type: 'pc',
        batch_quantity: 3,
        created_at: '2021-05-22T08:57:16.631Z',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam?',
        imageURL: 'mansikkakuva',
        category: 'Marjat ja hedelmät'
    }
]

const mockSizes = []

const getAllProducts = () => {
    return(products)
}

const getSellersProducts = (id) => {
    const result = products.filter(product => product.sellers_id == id)
    return(result)
}

const addProduct = (product) => {
    product.id = products.length + 1
    product.created_at = '2021-05-22T08:57:16.631Z'
    products.push(product)
    return(product.id)
}

const addProductSizes = async (product_id, sizes) => {
    sizes.forEach(size  => {
        mockSizes.push((product_id, size.price, size.quantity, size.unit, mockSizes.length+1))
    })
}

const getSizes = () => {
    return(mockSizes)
}

module.exports = { getAllProducts, getSellersProducts, addProduct, addProductSizes, getSizes }

