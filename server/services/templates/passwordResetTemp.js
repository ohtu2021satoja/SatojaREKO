const subject = 'Salasanan palautus'
const message = (parameters) => {

    return (`<p>Paina alla olevaa Vaihda salasana -nappia, vaihtaaksesi salasanan</p>\
    \
    <a href=${parameters.url}>\
        <button> Vahvista salasana </button>\
    </a>`)
}

module.exports = {subject, message}


    