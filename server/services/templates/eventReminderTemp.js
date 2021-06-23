const subject = 'Muistutus tulevasta noutotilaisuudesta'
const buyerMessage = (name, event) => {

    return (`<p>Hei ${name},</p>\
    \
    <p>Tämä on automaattisesti luotu muistutus tulevasta noutotilausuudesta</p>\
    \
    <p>Tilaisuus: </p>\
    \
    <p>market.address, event.start</p>\
    \
    <p>Erittely varatuista tuotteista löytyy osoitteesta:</p>\
    \
    <url>${profile url}</url>\
    \
    <p>Maukkaita hetkiä!</p>\
    <p>Satoja Tiimi</p>\
    \
    \
    <p>Etkö halua saada muistutusta tulevista noutotilaisuuksista. Voit muokata sähköpostiasetuksia profiili-sivulta</p>\
    <p>kirjatumulalla palveluun osoitteesta:</p>
    <url>www.satoja.fi</url>
`)
}

const sellerMessage = (name, event) => {

    return (`<p>Hei ${name},</p>\
    \
    <p>Tämä on automaattisesti luotu muistutus tulevasta noutotilausuudesta</p>\
    \
    <p>Tilaisuus: </p>\
    \
    <p>market.address, event.start</p>\
    \
    <p>Tarkemmat tiedot varatuista tuotteista löydät osoitteesta:</p>\
    \
    <url>${profile url}</url>
    
    <p>Hyviä noutohetkiä!</p>\
    <p>Satoja Tiimi</p>\
    \
    \
    <p>Etkö halua saada muistutusta tulevista noutotilaisuuksista. Voit muokata sähköpostiasetuksia profiili-sivulta</p>\
    <p>kirjatumulalla palveluun osoitteesta:</p>
    <url>www.satoja.fi</url>
    
`)
}

module.exports = {subject, buyerMessage, sellerMessage}


    