/*SQL-tietokannan skripti*/


/*
Luodaan rooms-taulu,
jossa parametreinä room_id,
room_name ja room_password
*/
CREATE TABLE IF NOT EXISTS rooms(
    room_id VARCHAR(255) NOT NULL,
    room_name VARCHAR(50) NOT NULL,
    room_password VARCHAR(255) DEFAULT NULL
);

/*
Luodaan user_messages-taulu,
jossa parametreinä message_id,
username, room_id, message_content created_at
*/
CREATE TABLE IF NOT EXISTS user_messages(
    message_id INT(11) NOT NULL,
    username VARCHAR(50) NOT NULL,
    room_id VARCHAR(255) NOT NULL,
    message_content VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NULL
);
/*
Luodaan user-taulu,
jossa parametreinä username, user_password
*/
CREATE TABLE IF NOT EXISTS users(
    username VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

/*
Lisätään pääavain room-tauluun
*/
ALTER TABLE
    rooms ADD PRIMARY KEY(room_id),
    ADD UNIQUE KEY unique_name(room_name);

/*
Lisätään pääavain user_messages-tauluun
*/
ALTER TABLE
    user_messages ADD PRIMARY KEY(message_id),
    ADD KEY username(username),
    ADD KEY room_id(room_id);

/*
Lisätään pääavain users-tauluun
*/
ALTER TABLE
    users ADD PRIMARY KEY(username);

/*
Muokataan viestien ID alkamaan 215
*/
ALTER TABLE
    user_messages MODIFY message_id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 215;

/*
Lisätään rajoituksia user_messages-tauluun suojaamaan datan eheyttä
*/
ALTER TABLE
    user_messages ADD CONSTRAINT user_messages_ibfk_1 FOREIGN KEY(username) REFERENCES users(username),
    ADD CONSTRAINT user_messages_ibfk_2 FOREIGN KEY(room_id) REFERENCES rooms(room_id);