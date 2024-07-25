CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    password VARCHAR
)

INSERT INTO users (username, password)
VALUES
    ( "Oscar", PP)