// Backend: server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;
const SECRET_KEY = 'secret123';

app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)`);
  db.run(`CREATE TABLE todos (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  text TEXT,
  description TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'medium',
  completed INTEGER DEFAULT 0
  );`);
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// User routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
    if (err) return res.status(500).json({ message: 'Error registering user' });
    res.json({ id: this.lastID });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Todo routes
app.get('/api/todos', authenticate, (req, res) => {
  db.all('SELECT * FROM todos WHERE user_id = ?', [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error fetching todos' });
    res.json(rows);
  });
});

app.post('/api/todos', authenticate, (req, res) => {
  const { text, description, due_date, priority, completed } = req.body;

  db.run('INSERT INTO todos (user_id, text, description, due_date, priority, completed) VALUES (?, ?, ?, ?, ?, ?)', 
    [req.userId, text, description, due_date, priority, completed], function(err) {
    if (err) return res.status(500).json({ message: 'Error creating todo' });
    
    const data = {
      id: this.lastID,
      user_id: req.userId,
      text,
      description,
      due_date,
      priority,
      completed
    };

    console.log("My data", data);
    res.status(201).json(data);
  });
});


app.put('/api/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  db.run('UPDATE todos SET text = ?, completed = ? WHERE id = ? AND user_id = ?', [text, completed, id, req.userId], function(err) {
    if (err) return res.status(500).json({ message: 'Error updating todo' });
    res.json({ updated: this.changes });
  });
});

app.delete('/api/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, req.userId], function(err) {
    if (err) return res.status(500).json({ message: 'Error deleting todo' });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));