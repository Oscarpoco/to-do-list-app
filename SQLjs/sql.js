import initSqlJs from 'sql.js';

let db;

export const initDatabase = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      picture TEXT,
      name TEXT,
      phone TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      date TEXT NOT NULL,
      priority TEXT NOT NULL,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
};

export const getDb = () => db;
