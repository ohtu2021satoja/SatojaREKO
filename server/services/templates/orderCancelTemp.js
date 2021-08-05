const subject =
  process.env.MODE === "production"
    ? "Tilattujen tuotteiden peruutus"
    : "Tilattujen tuotteiden peruutus (TESTISERVERI)"

const message = async (parameters) => {
  const text = `<p>Hei ${parameters.user.firstname} ${
    parameters.user.lastname
  },</p>\
    \
    <p>Tämä on automaattisesti luotu ilmoitus</p>\
    \
    <p>Tuottaja on perunut yhden tai useamman varaamasi tuotteen toimituksen</p>\
    <p>Tarkempi erittely toimituksista löytyy alta:</p>\
    \
    <p>Tilaisuus: </p>\
    \
    <p>${
      parameters.event.reko_name
    }, ${parameters.event.start.getUTCHours()}:${parameters.event.start.getUTCMinutes()}</p>\
    <p>${parameters.event.address}</p>\
    \
    <p>Tilannimi: ${parameters.seller.seller_name}</p>\
    <p>Myyjän nimi: ${parameters.seller.firstname} ${
    parameters.seller.lastname
  }</p>\ 
    <p>${parameters.seller.email}</p>\
    <p>${parameters.seller.phonenumber}</p>\
    
    <p>Poistetut tuotteet:</p>\
    \
    \
    ${await deletedProducts(parameters)}\
    \
    <url>${parameters.url}</url>\
    \
    
    <p>Maukkaita hetkiä!</p>\
    <p>Satoja Tiimi</p>\
    \
    \
    <p>Etkö halua saada muistutusta tulevista noutotilaisuuksista. Voit muokata sähköpostiasetuksia profiili-sivulta</p>\
    <p>kirjatumulalla palveluun osoitteesta:</p>
    <url>www.satoja.fi</url>
`
  return text
}

const deletedProducts = async (parameters) => {
  let products
  parameters.batches.forEach((product) => {
    if (!products) {
      products = `<li>Nimi: ${product.name} Määrä: ${product.quantity} Hinta: ${product.price}</li>\n`
    } else {
      products =
        products +
        `<li>Nimi: ${product.name} Määrä: ${product.quantity} Hinta: ${product.price}</li>\n`
    }
  })
  return "\n" + "<ul>\n" + products + "</ul>\n"
}

module.exports = { subject, message }
