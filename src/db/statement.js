const db = require('better-sqlite3')('database.db');

// CREATE TABLE
const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT
        )
    `;
    db.prepare(sql).run();
};

// INSERT USER
const registerUser = (username, password) => {
    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;
    db.prepare(sql).run(username, password);
};

// AUTHENTICATE USER
const authenticateUser = (username, password) => {
    const sql = `
        SELECT * FROM users
        WHERE username = ? AND password = ?
    `;
    return db.prepare(sql).get(username, password);
};

module.exports = {
    createTable,
    registerUser,
    authenticateUser
};
