const subject = 'Salasanan palautus'
const message = (parameters) => {

    return (`<p>Paina alla olevaa Vaihda salasana -nappia, vaihtaaksesi salasanan</p>\
    \
    <form action=${parameters.url}>\
        <input type="submit" value="Vaihda salasana" />\
    </form>`)
}

module.exports = {subject, message}


    