const subject =
  process.env.MODE === "production"
    ? "Salasanan palautus"
    : "Salasanan palautus (TESTISERVERI)"

const message = (parameters) => {
  return `<p>Paina alla olevaa Vaihda salasana -nappia vaihtaaksesi salasanan</p>\
    \
    <a href=${parameters.url}>\
        <button> Vahvista salasana </button>\
    </a>`
}

module.exports = { subject, message }
