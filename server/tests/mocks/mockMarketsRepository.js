const markets = [
    {
        id:1,
        area:"etelä-savo",
        address: "siellä täällä",
        type: "reko",
        location:[1 ,2 ]
    }
]

const getAllMarkets = () => {
    return markets
}

module.exports = { getAllMarkets }