const sqlite3 = require('sqlite3').verbose();

// Create a new database file if it doesn't exist
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

// Create tables
const createTables = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    date TEXT NOT NULL,
    priority TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err);
    }
  });
};

// Helper function to run queries
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

// Helper function to fetch all results from a query
const fetchAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Helper function to fetch a single result from a query
const fetchOne = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Example usage
const addUser = async (username, password) => {
  try {
    const result = await runQuery('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    console.log('User added with ID:', result.id);
  } catch (err) {
    console.error('Error adding user:', err);
  }
};

const addTask = async (task, date, priority, userId) => {
  try {
    const result = await runQuery('INSERT INTO tasks (task, date, priority, userId) VALUES (?, ?, ?, ?)', [task, date, priority, userId]);
    console.log('Task added with ID:', result.id);
  } catch (err) {
    console.error('Error adding task:', err);
  }
};

const getUserById = async (id) => {
  try {
    const user = await fetchOne('SELECT * FROM users WHERE id = ?', [id]);
    console.log('User:', user);
  } catch (err) {
    console.error('Error fetching user:', err);
  }
};

const getTasksByUserId = async (userId) => {
  try {
    const tasks = await fetchAll('SELECT * FROM tasks WHERE userId = ?', [userId]);
    console.log('Tasks:', tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};

// Example calls
(async () => {
  await addUser('testuser', 'password123');
  await addTask('Finish project', '2024-08-05', 'High', 1);
  await getUserById(1);
  await getTasksByUserId(1);
})();
