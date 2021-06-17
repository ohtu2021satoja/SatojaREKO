const subject = 'Salasanan palautus'
const message = (url) => {

    return (`<p>Paina alla olevaa Vaihda salasana -nappia, vaihtaaksesi salasanan</p>\
    \
    <form action=${url}>\
        <input type="submit" value="Vaihda salasana" />\
    </form>`)
}

module.exports = {subject, message}


    