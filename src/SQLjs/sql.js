import initSqlJs from 'sql.js';

async function setupDatabase() {
  try {
    // INITIALIZING DATABASE
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });

    // PERSISTING WITH LOCAL STORAGE
    let db;
    
    const savedDb = localStorage.getItem('sqliteDb');
    if (savedDb) {
      db = new SQL.Database(new Uint8Array(JSON.parse(savedDb)));
      
    } else {
      db = new SQL.Database();
    
    }

    // CREATING TABLES 
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        phone INTEGER UNIQUE,
        name TEXT
      );
      
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        priority TEXT,
        date TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
    

    // SAVE DB TO LOCALSTORAGE
    function saveDb() {
      const data = db.export();
      const arr = new Uint8Array(data);
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(arr)));
    }


    // SIGN UP FUNCTION
    function signUp(username, password) {
      try {

        console.log("Attempting to sign up user:", username);

        const checkStmt = db.prepare("SELECT id FROM users WHERE username = ?");
        const existingUser = checkStmt.getAsObject([username]);
        checkStmt.free();

        if (existingUser.id) {

          console.log("User already exists:", username);

          return { success: false, error: 'User already exists' };
        }

        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run([username, password]);
        stmt.free();
        
        const userId = db.exec("SELECT last_insert_rowid() as id")[0].values[0][0];

        console.log("User signed up successfully with ID:", userId);
        
        saveDb();
        return { success: true, userId: userId.toString() };
      } catch (error) {
        console.error("Sign up failed:", error);
        return { success: false, error: error.message };
      }
    }


    // SIGN IN FUNCTION
    function signIn(username, password) {
      try {
        console.log("Attempting to sign in user:", username);
        const stmt = db.prepare("SELECT id, username FROM users WHERE username = ? AND password = ?");
        const result = stmt.getAsObject([username, password]);
        stmt.free();

        if (result.id) {

          console.log("User signed in successfully:", result.username);

          return { 
            success: true, 
            user: { 
              userId: result.id.toString(), 
              username: result.username
            } 
          };
        } else {
          console.log("Sign in failed: Invalid credentials");
          return { success: false, error: 'Invalid username or password' };
        }
      } catch (error) {
        console.error("Sign in failed:", error);
        return { success: false, error: error.message };
      }
    }

    // TO DO CRUD OPERATIONS

    // Fetch todos for a user
    function getTodos(userId) {
      try {
        const stmt = db.prepare("SELECT * FROM todos WHERE user_id = ?");
        stmt.bind([userId]); // Bind the userId to the prepared statement
        
        const todos = [];
        while (stmt.step()) {
          const todo = stmt.getAsObject();
          console.log("Fetched todo:", todo); // Debugging log for each fetched todo
          todos.push(todo);
        }
        stmt.free();
        
        console.log("All fetched todos for user:", todos); // Debugging log for all todos
        return todos;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
      }
    }
    

   // Add a new todo
function addTodo(userId, task, date, priority) {
  try {
    // Ensure date is in a string format (e.g., ISO format)
    const formattedDate = new Date(date).toISOString();

    const stmt = db.prepare("INSERT INTO todos (user_id, task, date, priority) VALUES (?, ?, ?, ?)");
    stmt.run([userId, task, formattedDate, priority]);
    stmt.free();
    saveDb();
        console.log('Task', task)
        console.log('id', userId)
        console.log('date', date)
        console.log('Priority', priority)
    return { success: true };
    
  } catch (error) {
    console.error("Failed to add todo:", error);
    return { success: false, error: error.message };
  }
}


    // Update a todo
    function updateTodo(id, task, date, priority) {
      try {
        const stmt = db.prepare("UPDATE todos SET task = ?, date = ?, priority = ? WHERE id = ?");
        stmt.run([task, date, priority, id]);
        stmt.free();
        saveDb();
        return { success: true };
      } catch (error) {
        console.error("Failed to update todo:", error);
        return { success: false, error: error.message };
      }
    }

    // Delete a todo
    function deleteTodo(id) {
      try {
        const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
        stmt.run([id]);
        stmt.free();
        saveDb();
        return { success: true };
      } catch (error) {
        console.error("Failed to delete todo:", error);
        return { success: false, error: error.message };
      }
    }

    // UPDATE PROFILE
    // Fetch profile data
    async function fetchProfile(userId) {
      try {
        const stmt = db.prepare("SELECT username, picture, name, phone FROM users WHERE id = ?");
        stmt.bind([userId]);

        const profile = stmt.getAsObject();
        stmt.free();

        return profile;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        return {};
      }
    }

    // Update profile data
    async function updateProfile(userId, { username, picture, name, phone }) {
      try {
        const stmt = db.prepare("UPDATE users SET username = ?, picture = ?, name = ?, phone = ? WHERE id = ?");
        stmt.run([username, picture, name, phone, userId]);
        stmt.free();
        saveDb();
        return { success: true };
      } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, error: error.message };
      }
    }
    console.log("Database setup completed successfully");
    return {
      signUp,
      signIn,
      getTodos,
      addTodo,
      updateTodo,
      deleteTodo,
      fetchProfile,
      updateProfile
    };
  } catch (error) {
    console.error("Failed to initialize SQL.js:", error);
    throw new Error(`Database initialization failed: ${error.message}`);
  }
}

export default setupDatabase;