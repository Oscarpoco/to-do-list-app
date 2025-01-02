import React, { useState, useEffect } from 'react';

// LOADER 
import Loader from './Loader';

// TOAST
import CustomizedSnackbars from './toastNotification';

// STYLING
import './dashboard.css';

function TodoList({ token, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState('');

  // TODO STATE
  const [newTodo, setNewTodo] = useState({
    text: '',
    description: '',
    due_date: '',
    priority: 'medium'
  });

  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // TOAST STATE
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // PRIORITIES COLORS
  const PRIORITIES = {
    high: {
      color: '#ff4d4d',
      label: 'High'
    },
    medium: {
      color: '#ffd700',
      label: 'Medium'
    },
    low: {
      color: '#90EE90',
      label: 'Low'
    }
  };
  // ENDS

  // FILTER
  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // ENDS

  // HANDLE TOAST
  const handleToast = (message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity
    });
  };
  // ENDS

  // CLOSE TOAST
  const closeToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };
  // ENDS

  // FETCH TODOS
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        headers: { 'Authorization': token }
      });
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      handleToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  // ENDS


  // ADD TODO
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.text.trim()) {
      setError('Title is required');
      handleToast('Title is required', 'error');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newTodo)
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo({
        text: '',
        description: '',
        due_date: '',
        priority: 'medium'
      });
      setShowForm(false);
      handleToast('Todo added successfully');
    } catch (err) {
      setError(err.message);
      handleToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  // ENDS

  // DELETE A TODO
  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
      handleToast('Todo deleted successfully');
    } catch (err) {
      setError(err.message);
      handleToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  // ENDS

  // MARK AS COMPLETE
  const toggleTodo = async (id, completed) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          ...todo,
          completed: !completed
        })
      });
      if (!response.ok) throw new Error('Failed to update todo');
      await fetchTodos();
    } catch (err) {
      setError(err.message);
      handleToast(err.message, 'error');
    }
  };
  // ENDS

  // GET PRIORITY
  const getPriorityStyle = (priority) => {
    return {
      backgroundColor: PRIORITIES[priority]?.color || PRIORITIES.medium.color,
      color: priority === 'medium' ? '#000' : '#000', 
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500',
      letterSpacing: '1px'
    };
  };
  // ENDS

  // FORMAT DATE
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  // ENDS


  // EMPTY LIST
  if (isLoading && todos.length === 0) {
    return (
      <div className="todo-container">
        <div className="todo-header">
          <h2>Listify</h2>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
        <div className="loading-container">
          <Loader />
          <p>Loading your todos...</p>
        </div>
      </div>
    );
  }
  // ENDS

  // REMAINING RENDERING
  return (
    <div className="todo-container">

      {/* HEADER */}
      <div className="todo-header">
        <h2>Listify</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      {/* ENDS */}

      {/* ERROR */}
      {error && <div className="error">{error}</div>}
      {/* ENDS */}

      {/* OPEN & CLOSE FORM TO ADD A TODO */}
      <div className="search-container">

        {/* SEARCH */}
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search Todos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        {/* SEARCH */}

        {/* OPEN & CLOSE FORM TO ADD A TODO */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-todo-btn"
        >
          {showForm ? 'Cancel' : 'Add New Todo'}
        </button>
        {/* ENDS */}

      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            placeholder="Title"
            required
            className="form-input"
          />
          <textarea
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            placeholder="Description"
            className="form-textarea"
          />
          <div className="form-row">
            <input
              type="date"
              value={newTodo.due_date}
              onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
              className="form-input"
            />
            <select
              value={newTodo.priority}
              onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            {isLoading ? <Loader /> : 'Add Todo'}
          </button>
        </form>
      )}
      {/* ENDS */}

      {/* RENDER TODO ITEMS */}
      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>No todos found!</p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              style={{ borderLeft: `4px solid ${PRIORITIES[todo.priority]?.color || PRIORITIES.medium.color}` }}
            >
              <div className="todo-item-header">
                <div className="todo-item-main">
                  <input
                    type="checkbox"
                    checked={Boolean(todo.completed)}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                  />
                  <span className="todo-title">{todo.text}</span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  {isLoading ? <Loader /> : 'Delete'}
                </button>
              </div>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <div className="todo-item-footer">
                {todo.due_date && (
                  <span className="todo-date">
                    Due: {formatDate(todo.due_date)}
                  </span>
                )}
                <span className="todo-priority" style={getPriorityStyle(todo.priority)}>
                  {PRIORITIES[todo.priority]?.label || 'Medium'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* ENDS */}

      {/* TOAST */}
      <CustomizedSnackbars
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
      {/* ENDS */}
    </div>
  );
}

export default TodoList;