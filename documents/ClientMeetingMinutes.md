## Notes from the weekly meeting

# 21.06.21

### Yleistä

- Katsottiin sovellus näyttö näytöltä ja keskusteltiin mitä muutoksia niihin pitää tehdä
- Ehdotettiin, että saatasiin joku lyhyt sivustoa esittelevä määritelmä, joka näkyy hakukoneissa (description)
- Sovittiin, että testikäyttäjät voisivat testaat sovellusta keskiviikkona iltapäivällä (siirrettiin myöhemmälle)
- Keskusteltiin, mitä kysymyksiä tai tehtäviä testikäyttäjille voitaisiin antaa

### Kirjautumissivu

- Lisätään 'Tunne tuottaja' logon alle

### Myyjän tilaukset -sivu

- Tilaushistoria voidaan jättää tästä versiosta

### Ostajan tilaukset -sivu

- Ei näy Safarilla
- Selvennetään, milloin tilaus poistetaan kokonaan ja milloin poistetaan vain tuote

### Lisää tuote -sivu

- ALV 24% valittuna

### Myyjän profiilisivu

- Tehdään Ota yhteyttä -linkistä selvempi

### Tilaisuus-sivun Noudot

- Tuotteet näytetään tilakohtaisesti
- plus- ja miinus-merkit pois ja kappalemäärä tilalle

# 14.06.21

- Sähköposti - Ei kriittinen asia - mutta hyvä saada jos pystyy mukaan
- Priorisointi tärkeä, ydin toiminnallisuudet kuntoon ja viilattu.

## Tuotelistaus. 

- Kaksi erilaista tuotenäkymää lihoille ja muille, avautuva kortti komponentti menee epäselvän näköiseksi jos kaikki samassa klikattavassa komponentissa
- Eli +/- jos samaa tuotekokoa on useampi kuin 1, muuten omalle sivulle missä jokainen “lihakimpale” näkyy erikseen.
- listauksessa ostajat/tuotteet aakkosjärjestys alkajaisiksi. muut sorttaukset (low priority)

## Tuotteet
- Tuotteen muokkaus - kriittinen asia, minimissään admin voi muokata.
- Tekstin muokkaus helppo
- Luodaan uusi tuote jos hinta vaihtuu
- Luomutietoa ei voi muokata vielä

## tekninen 

- web socket ensi version ongelma, ei kosketa siihen nytten
- tekninen keskustelu Redux Viljamin kanssa. (perjantai)
- EI IKINÄ REFRESH BUTTON
- autorisointi, voiko tuottaja poistaa/muokkaa vain omia tuotteitaan.

## käyttöehdot

## Myyjän etusivu pysyy näyteikkunana

# 07.06.21

### Yleistä

- Profiili- tai tuotekuviin voidaan käyttää oletuskuvaa, jos kuvaa ei ole ladattu

- Tuotteen tiedot voidaan katsoa suoraan noutotilaisuuden tuotelistalta, ei siirrytä uudelle sivulle

- Haetaan ratkaisua tilausten poiston toiminnallisuuteen
    - Miten vahinkopoistoja voidaan vähentää
    - Voidaanko poistettu tuote palauttaa
    - Poistetun tuotteen pitää myös näkyä poistettuna kaikille 
    - Poistettuja tuotteita ei näytetä karttasivulla

- Sähköposti-ilmoitukset eivät ole tällä hetkellä prioritettilistalla, mutta mietitään, mitä ilmoituksia voitaisiin lähettää 

- Toiveena olisi saada muutama testikäyttäjä sovellukselle 21.06 alkavalla viikolla

- Herokulle hankitaan maksullinen versio

- Sovellukseen liitetään Google Analytics

### Tuottajat

- Kaikki tuottajan tilaukset näytetään Tilaus-sivulla aikajärjestyksessä (päivämäärän mukaan uusin ensin)

- Myyntiraportti on nähtävillä sovelluksessa

### Admin-paneeli (prioriteetti)

Toivottuja ominaisuuksia (prioriteetti)
- Kategorian muokkaaminen
- Ilmoitusten muokkaaminen
- Tapahtuman muokkaaminen 
- Uusien paikkakuntien lisääminen
- Uusien noutotilaisuuksien lisääminen
- Käyttötilin lukitseminen

Toivottua statistiikkaa
- Myyjien ja ostajien määrä
- Palaavien asiakkaiden osuus
- Myyntiluvut

### Kartta

- Kun ostaja kirjautuu, karttanäkymä on keskitetty hänen sijaintiinsa, jos lupa sijaintitietojen käyttöön on annettu

- Jos lupaa ei ole annettu, näytetään Etelä-Savon maakunta

- Tuottajan tiedot (nimi, logo/kuva, osoite, numero) näyttävä ponnahdusikkuna tulee esille sijaintiosoitinta napauttamalla ja nappia painamalla siirrytään tuottajan profiilisivulle

### Profiilisivu

- Tuottajan profiilisivulle lisätään osoite- ja kotisivukenttä, kun tuottaja valitsee ensimmäisen Reko-ryhmän

- Luodaan Ota yhteyttä -sivu ja lisätään Ota yhteyttä -linkki tuottajan profiilisivulle, jotta tuottaja voi ehdottaa Reko-ryhmän lisäämistä


# 31.05.21

### Profiilitietojen päivitys

- Lähtökohtaisesti kaikkia tietoja pitää voida muokata

- Muokatut tiedot päivitetään automaattisesti viiveen jälkeen
    - esim. setTimeout, defer, throttle

- Muokatut tiedot päivitetään navigoitaessa pois profiilisivulta

- Lodash ja Ramda mahdollisesti tässä yhteydessä hyödyllisiä 

### Tuotteiden lisääminen

- Tarvitaanko vielä lisäkenttä yksikkömäärälle lisättäessä kiinteähintaisia tuotteita?

### Ostoskori

- Mahdollisuuksien mukaan tehdään niin, että samaan ostoskoriin voi lisätä tuotteita useasta eri tilaisuudesta

### Selainyhteensopivuus

- Tehdään käytettävyystestausta ensisijaisesti Chromella, ajan salliessa katsotaan yhteensopivuutta Firefoxin ym. kanssa

### Kuvien lataaminen

- Suorituskyvyn kannalta hyvä ottaa huomioon ladattavien kuvien koot

- Indikoidaan meneillään olevat lataukset



# 24.05.21

- Käytetään MIT-lisenssiä 

- Käytetään [Cloudinary-palvelua](https://cloudinary.com/) kuvien tallentamiseen (cloudinary.com)

- Lähdetään rakentamaan kirjautumista Facebookin kautta näin alkuun ja jätetään kirjautuminen sähköpostilla myöhemmälle

- Lähdetään rakentamaan tuotevalikoimahakua keskittymällä aluksi tuottajiin. Myöhemmin lisättäväksi haku tuotekategorialla tai sanalla

- Mietittiin, mikä on paras käytäntö (tietokannan rakenteen pohjalta) näyttää tuottajalle kaikki noudettavaksi merkityt tuotteet tilaisuuskohtaisesti. 

- Keskuteltiin yleisesti käyttöliittymän ulkomuodosta. AdobeXD-demossa on valmiita tyylivalintoja käytettäviksi. Työskentelyn kannalta on kuitenkin parempi, että lisätää tyylit vasta myöhemmässä vaiheessa. 


## Front-endin tavoitteista

Tarkoituksena on luoda käyttöliittymä, joka näyttää samalta kaikissa selaimissa ja laitteissa. Pyrimme myös siihen, että käyttöliittymä toimii mahdollisimman [esteettömästi](https://appro.mit.jyu.fi/essikurssi/testaus/t2/).

Tehdäksemme mahdollisimman yhtenäisen ja toimivan kokonaisuuden, päätimme käyttää apunamme [Bootstrap-sovelluskehystöä](https://getbootstrap.com/docs/5.0/getting-started/introduction/).



- yrityksen oma outlet jossa voi kertoa yrityksen tietoja etc...

## Kirjautuminen
- Welcome page - Täällä taas sivu - 
- Facebook kirjautumisen jälkeen, kysytään vielä puhelinnumero / osoite minimi
- Muut tiedot voidaan päivittää myöhemmin
- Profiili
- Ostaja puhelinnumero jaetaan vain tilauksiin, eli vain tuottajille, ei ole julkista profiili tietoa.
