# REST-API-dokumentaatio

Projektin REST-API tarjoaa seuraavat reitit:

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


