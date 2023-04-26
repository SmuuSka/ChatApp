CREATE TABLE IF NOT EXISTS rooms(
    room_id VARCHAR(255) NOT NULL,
    room_name VARCHAR(50) NOT NULL,
    room_password VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_messages(
    message_id INT(11) NOT NULL,
    username VARCHAR(50) NOT NULL,
    room_id VARCHAR(255) NOT NULL,
    message_content VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users(
    username VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

ALTER TABLE
    rooms ADD PRIMARY KEY(room_id),
    ADD UNIQUE KEY unique_name(room_name);

ALTER TABLE
    user_messages ADD PRIMARY KEY(message_id),
    ADD KEY username(username),
    ADD KEY room_id(room_id);

ALTER TABLE
    users ADD PRIMARY KEY(username);

ALTER TABLE
    user_messages MODIFY message_id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 215;

ALTER TABLE
    user_messages ADD CONSTRAINT user_messages_ibfk_1 FOREIGN KEY(username) REFERENCES users(username),
    ADD CONSTRAINT user_messages_ibfk_2 FOREIGN KEY(room_id) REFERENCES rooms(room_id);