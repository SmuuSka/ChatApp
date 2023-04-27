# ChatApp

## Linkit

-Itse sovellus: http://10.114.32.6:3000/

Sovelluksen kokeilemiseen tarvitset Metropolian VPN-yhteyden tai sinun on oltava eduroam-verkossa.

## Käyttötarkoitus ja toimintaperiaate

Sovelluksen käyttötarkoitus on toimia eräänlaisena chat-sovelluksena, missä käyttäjät pystyvät keskustella toistensa kanssa omissa chat-huoneissa.  Sovellus tarjoaa mahdollisuuden huoneiden luomiseen ja niihin liittymiseen. <br/> <br/>  Sovelluksen käyttäjäryhmiin kuuluu kirjautumattomat ja kirjautuneet käyttäjät. Kirjautuneille käyttäjille tallentuu tieto huoneista, joissa he ovat aiemmin keskustelleet. Kirjautumattomat käyttäjät valitsevat ennen keskustelumahdollisuutta oman väliaikaisen nimen. <br/><br/> Keskusteluhuoneita on kahdenlaisia. Salasanattomia ja salasanallisia. Salasanattomat huoneet näkyvät sivupalkissa kirjautumattomille käyttäjille ja niihin pystyy liittyä syöttämättä salasanaa. Salasanalliset huoneet näkyvät kirjautuneille käyttäjille jos käyttäjä on aikasemmin liittynyt sinne ja lähettänyt sinne viestin/viestejä. Molemmpien kaltaisiin huoneisiin on mahdollisuus liittyä "Join Room" napista. Sivupalkissa on myös hakutoiminallisuus.

## Toteutuksesta

Chat-sovelluksen käyttöliittymä, eli ns. client-puoli on toteutettu Reactilla käyttäen myös bootstrappia. Server-puoli on toteutettu Nodella, käyttäen kirjastoja, kuten Express, Mariadb ja Socket.io. Socket.io on myös sisällytetty client-puolen kirjastoihin.

# Sovelluksen REST-API:n dokumentaatio

## Kirjautuminen

### `/login` POST

Reitti ottaa vastaan käyttäjänimen ja salasanan. Se tarkistaa, että käyttäjänimi ja salasana ovat oikein, luo tokenin ja palauttaa sen yhdessä käyttäjänimen kanssa vastauksena.

## Viestit

### `api/messages/:id` GET

Reitti palauttaa kaikki tietyn huoneen viestit. Id-parametri määrittää huoneen.

### `api/messages/:id` POST

Reitti lähettää viestin tiettyyn huoneeseen. Id-parametri määrittää huoneen.

## Huoneet

### `api/rooms` GET

Reitti palauttaa kaikki olemassa olevat huoneet.

### `api/rooms/user/:username` GET

Reitti palauttaa kaikki huoneet, joissa käyttäjä on viestitellyt. Username-parametri määrittää käyttäjänimen.

### `api/rooms/public` GET

Reitti palauttaa kaikki julkiset huoneet, eli huoneet joilla ei ole salasanaa.

### `api/rooms` POST

Reitti luo uuden huoneen annetulla nimellä ja salasanalla.

## Käyttäjät

### `api/users` GET

Reitti palauttaa kaikki olemassa olevat käyttäjät.

### `api/users` POST

Reitti luo uuden käyttäjän annetulla käyttäjänimellä ja salasanalla.

## Vastauksen muoto

API vastaa JSON-muodossa.


