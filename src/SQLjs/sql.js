import initSqlJs from 'sql.js';

async function setupDatabase() {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Creating a new in-memory database
  const db = new SQL.Database();

  // Creating tables
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      phone INTEGER UNIQUE,
      name TEXT
    );
    
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      task TEXT,
      priority TEXT,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `); 

  // Function to sign up a new user
  function signUp(username, password) {
    try {
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Function to sign in a user
  function signIn(username, password) {
    const result = db.exec("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    return result[0] ? { success: true, user: result[0].values[0] } : { success: false };
  }

  // Function to add a task item
  function addTodo(userId, task, date, priority) {
    try {
      db.run("INSERT INTO todos (user_id, task, date, priority) VALUES (?, ?, ?, ?)", [userId, task, date, priority]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Function to get all tasks for a user
  function getTodos(userId) {
    const result = db.exec("SELECT * FROM todos WHERE user_id = ?", [userId]);
    return result[0] ? result[0].values : [];
  }

  // Function to update a tasks item
  function updateTodo(id, task, date, priority) {
    try {
      db.run("UPDATE todos SET task = ?, date = ?, priority = ? WHERE id = ?", [task, date, priority, id]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Function to delete a tasks item
  function deleteTodo(id) {
    try {
      db.run("DELETE FROM todos WHERE id = ?", [id]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Function to update user profile
  function updateProfile(userId, phone, name, username, password) {
    try {
      db.run("UPDATE users SET phone = ?, name = ?, username = ?, password = ? WHERE id = ?", [phone, name, username, password, userId]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Returning the functions so they can be used elsewhere
  return {
    signUp,
    signIn,
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    updateProfile
  };
}

// Exporting setupDatabase as the default export
export default setupDatabase;


// testing my sql.js on development
setupDatabase().then(dbMethods => {
  // Example usage
  const { signUp, signIn, addTodo, getTodos, updateTodo, deleteTodo, updateProfile } = dbMethods;
  
  // Sign up a user
  console.log(signUp('ok@gmail.com', 'password123'));

  // Sign in a user
  console.log(signIn('ok@gmail.com', 'password123'));

  // Add a to-do
  console.log(addTodo(1, 'Finish project', '2023-12-31', 'high'));

  // Get all to-dos
  console.log(getTodos(1));

  // Update a to-do
  console.log(updateTodo(1, 'Finish project by tonight', '2023-12-31', 'high'));

  // Delete a to-do
  console.log(deleteTodo(1));

  // Update user profile
  console.log(updateProfile(1, '1234567890', 'John Doe', 'newusername', 'newpassword'));
});
