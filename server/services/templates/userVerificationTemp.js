const subject = 'Vahvista tunnus'
const message = (url) => {

    return (`<p>Paina alla olevaa vahvista nappia, vahvistaaksesi tunnuksen luomisen</p>\
    \
    <form action=${url}>\
        <input type="submit" value="Vahvista tunnus" />\
    </form>`)
}

module.exports = {subject, message}


    