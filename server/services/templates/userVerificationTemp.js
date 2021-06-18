const subject = 'Vahvista tunnus'
const message = (parameters) => {

    return (`<p>Paina alla olevaa vahvista nappia, vahvistaaksesi tunnuksen luomisen</p>\
    \
    <form action=${parameters.url}>\
        <input type="submit" value="Vahvista tunnus" />\
    </form>`)
}

module.exports = {subject, message}


    