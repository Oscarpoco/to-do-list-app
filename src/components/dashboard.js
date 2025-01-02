import React, { useState, useEffect } from 'react';
import "./dashboard.css";

function TodoList({ token, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTodo, setNewTodo] = useState({
    text: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);


  // FETCH TODO LISTS
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);
  // ENDS


  // ADD TO DO LIST
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.text.trim()) {
      setError('Title is required');
      return;
    }

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
        dueDate: '',
        priority: 'medium'
      });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // ENDS

  // TOGGLE TO DO
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
    }
  };
  // ENDS

  // DELETE TO DO
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  // ENDS

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ff4d4d',
      medium: '#ffd700',
      low: '#90EE90'
    };
    return colors[priority]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>Todo List</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      {error && <div className="error">{error}</div>}
      
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="add-todo-btn"
      >
        {showForm ? 'Cancel' : 'Add New Todo'}
      </button>

      {showForm && (
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({...newTodo, text: e.target.value})}
            placeholder="Title"
            required
            className="form-input"
          />
          <textarea
            value={newTodo.description}
            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
            placeholder="Description"
            className="form-textarea"
          />
          <div className="form-row">
            <input
              type="date"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
              className="form-input"
            />
            <select
              value={newTodo.priority}
              onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Add Todo</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <li 
          key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
            style={{ borderLeft: `4px solid ${getPriorityColor(todo.priority)}` }}
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
                Delete
              </button>
            </div>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-item-footer">
              {todo.dueDate && (
                <span className="todo-date">
                  Due: {formatDate(todo.dueDate)}
                </span>
              )}
              <span className="todo-priority" style={{ backgroundColor: getPriorityColor(todo.priority) }}>
                {todo.priority ?
                  todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) :
                  'Medium'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;