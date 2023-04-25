# REST API:n kuvaus

## Kirjautuminen

### `POST /login`

Kirjautumisreitti vastaanottaa käyttäjänimen ja salasanan POST-pyynnön rungossa (body). Mikäli käyttäjänimi ja salasana ovat oikein, reitti palauttaa JWT-tokenin, jota voi käyttää tunnistautumiseen muiden reittien käytössä. Muussa tapauksessa reitti palauttaa HTTP-virhekoodin 401 ja virheilmoituksen.

## Viestit

### `GET /messages/:id`

Viestireitti vastaanottaa ID-parametrin ja palauttaa JSON-muodossa kaikki kyseisessä huoneessa lähetetyt viestit.

### `POST /messages/:id`

Viestin lähetysreitti vastaanottaa viestin tiedot POST-pyynnön rungossa (body) ja tarkistaa, että viesti on kelvollinen (ei liian pitkä tai lyhyt). Mikäli viesti on kelvollinen, reitti tallentaa viestin tietokantaan ja palauttaa tallennetun viestin tiedot JSON-muodossa.

## Huoneet

### `GET /rooms/room/:key`

Huonereitti vastaanottaa API-avaimen ja palauttaa JSON-muodossa kaikki huoneet, jotka on tallennettu tietokantaan.

### `GET /rooms/user/:username/:key`

Tämä huonereitti vastaanottaa API-avaimen ja käyttäjänimen ja palauttaa JSON-muodossa kaikki huoneet, joissa kyseinen käyttäjä on viestitellyt.

### `GET /rooms/public/:key`

Tämä huonereitti vastaanottaa API-avaimen ja palauttaa JSON-muodossa kaikki julkiset huoneet (huoneet, joissa ei ole salasanaa).


### `POST /rooms/`

Huoneen lisäysreitti vastaanottaa huoneen nimen ja mahdollisen salasanan POST-pyynnön rungossa (body). Reitti tarkistaa, että huoneen nimi on kelvollinen ja salasanan pituus ei ylitä ennalta määrättyä rajaa. Mikäli tiedot ovat kelvolliset, reitti luo uuden huoneen ja tallentaa sen tietokantaan. Muussa tapauksessa reitti palauttaa HTTP-virhekoodin 422 ja virheilmoituksen.

## Käyttäjät

### `POST /users/`

Käyttäjän lisäysreitti vastaanottaa käyttäjänimen ja salasanan POST-pyynnön rungossa (body). Reitti tarkistaa, että salasanan pituus on kelvollinen.

### `GET /users/`

Tämä reitti palauttaa kaikki tietokannassa olevat käyttäjät.