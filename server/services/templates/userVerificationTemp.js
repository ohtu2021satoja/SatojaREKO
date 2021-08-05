const subject =
  process.env.MODE === "production"
    ? "Vahvista tunnus"
    : "Vahvista tunnus (TESTISERVERI)"
    
const message = (parameters) => {
  return `<p>Paina alla olevaa vahvista nappia, vahvistaaksesi tunnuksen luomisen</p>\
    \
    <a href=${parameters.url}>\
        <button> Vahvista tunnus </button>\
    </a>`
}

module.exports = { subject, message }
