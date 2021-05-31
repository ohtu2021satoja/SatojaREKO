## Notes from the weekly meeting

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