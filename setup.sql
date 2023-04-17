CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id INT NOT NULL AUTO_INCREMENT,
  room_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (room_id)
);

CREATE TABLE IF NOT EXISTS user_messages (
  message_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  message_content VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (message_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

INSERT INTO users (username, password) VALUES ('john', 'password123');
INSERT INTO rooms (room_name) VALUES ('keskusteluhuone 1');
INSERT INTO user_messages (user_id, room_id, message_content) VALUES (1, 1, 'Hei kaikki!');