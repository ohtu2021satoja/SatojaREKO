const subject = 'Muistutus tulevasta noutotilaisuudesta'

const message = (parameters) => {
    if(parameters.is_seller_message){
        return sellerMessage(parameters)
    } else{
        return buyerMessage(parameters)
    }
}

const buyerMessage = (parameters) => {

    return (`<p>Hei ${parameters.user.firstname} ${parameters.user.lastname},</p>\
    \
    <p>Tämä on automaattisesti luotu muistutus tulevasta noutotilausuudesta</p>\
    \
    <p>Tilaisuus: </p>\
    \
    <p>${parameters.event.reko_name}, ${new Date(parameters.event.start).getUTCHours()}:${ new Date(parameters.event.start).getUTCMinutes()}</p>\
    <p>${parameters.event.address}, ${parameters.event.area}</p>\
    \
    <p>Erittely varatuista tuotteista löytyy osoitteesta:</p>\
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
`)
}

const sellerMessage = (parameters) => {

    return (`<p>Hei ${parameters.user.name},</p>\
    \
    <p>Tämä on automaattisesti luotu muistutus tulevasta noutotilausuudesta</p>\
    \
    <p>Tilaisuus: </p>\
    \
    <<p>${parameters.event.reko_name}, ${new Date(parameters.event.start).getUTCHours()}:${ new Date(parameters.event.start).getUTCMinutes()}</p>\
    <p>${parameters.event.address}, ${parameters.event.area}</p>\
    \
    <p>Tarkemmat tiedot varatuista tuotteista löydät osoitteesta:</p>\
    \
    <url>${parameters.url}</url>
    
    <p>Hyviä noutohetkiä!</p>\
    <p>Satoja Tiimi</p>\
    \
    \
    <p>Etkö halua saada muistutusta tulevista noutotilaisuuksista. Voit muokata sähköpostiasetuksia profiili-sivulta</p>\
    <p>kirjatumulalla palveluun osoitteesta:</p>
    <url>www.satoja.fi</url>
    
`)
}

module.exports = {subject, buyerMessage, sellerMessage, message}


    