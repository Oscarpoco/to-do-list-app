// const sqlite3 = require('sqlite3').verbose();

const { Message } = require('@mui/icons-material');


// const db = new sqlite3.Database('./database.db', (err) => {
//   if (err) {
//     console.error('Error opening database:', err);
//   } else {
//     console.log('Connected to the SQLite database.');
//     // createTables();
//   }
// });


// // Create tables
// const createTables = () => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL
//   )`, (err) => {
//     if (err) {
//       console.error('Error creating users table:', err);
//     }
//   });

//   db.run(`CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     task TEXT NOT NULL,
//     date TEXT NOT NULL,
//     priority TEXT NOT NULL,
//     userId INTEGER,
//     FOREIGN KEY(userId) REFERENCES users(id)
//   )`, (err) => {
//     if (err) {
//       console.error('Error creating tasks table:', err);
//     }
//   });
// };

// // Helper function to run queries
// const runQuery = (query, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.run(query, params, function(err) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ id: this.lastID });
//       }
//     });
//   });
// };

// // Helper function to fetch all results from a query
// const fetchAll = (query, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.all(query, params, (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// };

// // Helper function to fetch a single result from a query
// const fetchOne = (query, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.get(query, params, (err, row) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(row);
//       }
//     });
//   });
// };

// // Example usage
// const addUser = async (username, password) => {
//   try {
//     const result = await runQuery('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
//     console.log('User added with ID:', result.id);
//   } catch (err) {
//     console.error('Error adding user:', err);
//   }
// };

// const addTask = async (task, date, priority, userId) => {
//   try {
//     const result = await runQuery('INSERT INTO tasks (task, date, priority, userId) VALUES (?, ?, ?, ?)', [task, date, priority, userId]);
//     console.log('Task added with ID:', result.id);
//   } catch (err) {
//     console.error('Error adding task:', err);
//   }
// };

// const getUserById = async (id) => {
//   try {
//     const user = await fetchOne('SELECT * FROM users WHERE id = ?', [id]);
//     console.log('User:', user);
//   } catch (err) {
//     console.error('Error fetching user:', err);
//   }
// };

// const getTasksByUserId = async (userId) => {
//   try {
//     const tasks = await fetchAll('SELECT * FROM tasks WHERE userId = ?', [userId]);
//     console.log('Tasks:', tasks);
//   } catch (err) {
//     console.error('Error fetching tasks:', err);
//   }
// };

// // Example calls
// (async () => {
//   await addUser('testuser', 'password123');
//   await addTask('Finish project', '2024-08-05', 'High', 1);
//   await getUserById(1);
//   await getTasksByUserId(1);
// })();



// const sqlite3 = require('sqlite3').verbose();
// let sql;

// // connecting to the database

// const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err.message)
// });

// // creating tables 

// // users table

// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username, name, phone, password)`
// db.run(sql)

// // tasks table

// sql = `CREATE TABLE tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task, date, priority, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(id))`
// db.run(sql);


// // INSERING INTO USERS TABLE

// sql = `INSERT INTO users(username, name, phone, password) VALUES (?,?,?,?)`
// db.run(sql, [], (err) => {
//    if (err) return console.error(err.message)});

// //  INSERTING INTO TASKS

// sql = `INSERT INTO tasks(task, date, prioeity) VALUES (?,?,?)`
// db.run(sql, [], (err) => {
//    if (err) return console.error(err.message)});

// //  UPDATING DATA TO users

// // QUERING DATA FROM USERS

// sql = `SELECT * FROM users`
// db.run(sql,[], (err, rows)=>{
//      if (err) return console.error(err.message);
//      rows.forEach((row)=> {console.log(row)});
// })

// // QUERING DATA FROM TASKS

// sql = `SELECT * FROM tasks`
// db.run(sql,[], (err, rows)=>{
//      if (err) return console.error(err.message);
//      rows.forEach((row)=> {console.log(row)});
// })

//  FOUURTH ATTEMPT WITH DIFFERENT APPROACH, I HOPE THIS TIME IT WORKS

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

app.use(bodyParser.json());

// THIS CODE CONNECT THE DATABASE
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// CREATE BOTH TABLES FOR USERSS AND TASKS
db.run(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, name TEXT, phone TEXT, password TEXT)`);
db.run(`CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, date TEXT, priority TEXT, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(id))`);

// SELECT ALL FROM USER
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// ALSO THIS SELECT ALL BUT FROM TASKS
app.post('/users', (req, res) => {
    const { username, name, phone, password } = req.body;
    const sql = `INSERT INTO users(username, name, phone, password) VALUES (?, ?, ?, ?)`;
    db.run(sql, [username, name, phone, password], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// GETTING ALL THE TASKS
app.get('/tasks', (req, res) => {
    const userId = req.query.userId;
    const sql = `SELECT * FROM tasks WHERE userId = ?`;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// ADDING A TASK
app.post('/tasks', (req, res) => {
    const { task, date, priority, userId } = req.body;
    const sql = `INSERT INTO tasks(task, date, priority, userId) VALUES (?, ?, ?, ?)`;
    db.run(sql, [task, date, priority, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// UPDATE THE TASKS
app.put('/tasks/:id', (req, res) => {
    const { task, date, priority, userId } = req.body;
    const sql = `UPDATE tasks SET task = ?, date = ?, priority = ?, userId = ? WHERE id = ?`;
    db.run(sql, [task, date, priority, userId, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// DELETE THE TASKS
app.delete('/tasks/:id', (req, res) => {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
