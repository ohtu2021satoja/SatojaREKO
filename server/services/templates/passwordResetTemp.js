const subject = 'Salasanan palautus'
const message = (parameters) => {
    console.log("parameters", parameters)
    console.log(parameters.url)

    return (`<p>Paina alla olevaa Vaihda salasana -nappia, vaihtaaksesi salasanan</p>\
    \
    <form action=${parameters.url}>\
        <input type="submit" value="Vaihda salasana" />\
    </form>`)
}

module.exports = {subject, message}


    