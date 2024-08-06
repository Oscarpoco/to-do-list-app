const initSqlJs = require('sql.js');


async function setupDatabase() {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Creating a database
  const db = new SQL.Database();

  // Creating tables
//   Users and tasks
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT
    );
    

    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      task TEXT,
      done BOOLEAN,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `); 

  // Function to sign up a new user
  function signUp(username, password, email) {
    try {
      db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email]);
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
  function addTodo(userId, task) {
    try {
      db.run("INSERT INTO todos (user_id, task, done) VALUES (?, ?, ?)", [userId, task, false]);
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
  function updateTodo(id, task, done) {
    try {
      db.run("UPDATE todos SET task = ?, done = ? WHERE id = ?", [task, done, id]);
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
  function updateProfile(userId, newEmail) {
    try {
      db.run("UPDATE users SET email = ? WHERE id = ?", [newEmail, userId]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
// I,m RETURNING THEM SO I CAN BE ABLE TO USE THEM ELSE WHERE
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


// testing my sql.js on development
setupDatabase().then(dbMethods => {
  // Example usage
  const { signUp, signIn, addTodo, getTodos, updateTodo, deleteTodo, updateProfile } = dbMethods;
  
  // Sign up a user
  console.log(signUp('oscar_kyle', 'password123', 'ok@gmail.com'));

  // Sign in a user
  console.log(signIn('oscar_kyle', 'password123'));

  // Add a to-do
  console.log(addTodo(1, 'Finish project'));

  // Get all to-dos
  console.log(getTodos(1));

  // Update a to-do
  console.log(updateTodo(1, 'Finish project by tonight', true));

  // Delete a to-do
  console.log(deleteTodo(1));

  // Update user profile
  console.log(updateProfile(1, 'okpoco@gmail.com'));
});
