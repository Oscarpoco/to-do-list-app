CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    password VARCHAR
)

INSERT INTO users (username, password)
VALUES
    ( "Oscarpoco", "poco@2000"),
    ( "Pocooscar", "oscar@2000")

UPDATE users
SET username = "Oscarpoco@gmail.com"
WHERE username = "Oscarpoco"

SET password = "Poco@2000"
WHERE password = "poco@2000"

SELECT surname FROM users
WHERE id = 1

SELECT password FROM users
WHERE id = 1

DELETE FROM users

SELECT * from users


