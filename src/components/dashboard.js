import React, { useState, useEffect } from 'react';

// DATABASE
import setupDatabase from '../SQLjs/sql';

// COMPONENTS
import './dashboard.css';
import SearchInput from './search';
import UserPopup from './UserPopup';
import Loader from './Loader';
import CustomizedSnackbars from './toastNotification';

// ICONS
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { LuListTodo } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";


function Dashboard({ setIsSignedIn }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("none");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const [profile, setProfile] = useState({
    username: '',
    picture: '',
    password: '',
    name: '',
    phone: ''
  });

  
  const userId = localStorage.getItem('userId');
  const [db, setDb] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Initialize the database
  useEffect(() => {
    async function initializeDatabase() {
      const database = await setupDatabase();
      setDb(database);
    }
    initializeDatabase();
  }, []);

  // Fetch tasks once the database is ready and the userId is available
  useEffect(() => {
    if (db && userId) {
      fetchTasks();
    }
  }, [db, userId]);

  const fetchTasks = async () => {
    if (db && userId) {
      try {
       
        const userTasks = db.getTodos(userId);

        setTasks(userTasks || []); 
        setFilteredTasks(userTasks || []);  

      } catch (error) {
        setSnackbar({ open: true, message: 'Error Fetching Tasks', type: 'error' });  
      }
    } else {
      setSnackbar({ open: true, message: 'Database or userId not available yet.', type: 'error' });
    }
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // LOGOUT
  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsSignedIn(false);
      setIsLoading(false);
    }, 2000);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      // Clear form fields on closing the form
      setTask("");
      setDate("");
      setPriority("none");
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  // Handle input changes
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value); 
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (db) {
      if (isEditing) {

        // Update task
        const taskToUpdate = filteredTasks[editIndex];
        db.updateTodo(taskToUpdate.id, task, new Date(date).toISOString(), priority);
        setSnackbar({ open: true, message: 'Successfully added.', type: 'success' });
      } else {
        // Add new task
        db.addTodo(userId, task, new Date(date).toISOString(), priority); 
        setSnackbar({ open: true, message: 'Successfully added.', type: 'success' });
      }
      fetchTasks();
      toggleFormVisibility();
    }
  };

  // Handle task editing
  const handleEdit = (index) => {
    const taskToEdit = filteredTasks[index];
    setTask(taskToEdit.task);
    setDate(taskToEdit.date);
    setPriority(taskToEdit.priority);
    setIsFormVisible(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Handle task deletion
  const handleDelete = (id) => {
    if (db) {
      db.deleteTodo(id);
      fetchTasks();
      setSnackbar({ open: true, message: 'Successfullu deleted.', type: 'success' });
    }
  };

  // Update profile data
  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Get priority color for display
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "rgba(254, 1, 1, 0.23)";
      case "Medium":
        return "rgba(255, 255, 0, 0.221)";
      case "Low":
        return "rgba(0, 128, 0, 0.205)";
      default:
        return "white";
    }
  };

  // Search for tasks based on the search term
  const searchTasks = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task =>
        task.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  // HANDLE CLOSE THE SNACKBAR
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // LOADING
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  // ENDS

  return (
    <div className='dashboard'>
      <div className='menu-box'>
        <div className='top'>
          <div className='logo'>
            <h3>Lis<span>tify</span><LuListTodo className='icon' /></h3>
          </div>
        </div>
        <div className='middle'>
        </div>
        <div className='bottom'>
          <button onClick={handleLogout}><RiLogoutBoxLine className='icon' /> Logout</button>
        </div>
      </div>
      <div className='to-do-box'>
        <div className='searchNav'>
          <div className='search'>
            <SearchInput searchTasks={searchTasks} />
          </div>
          <div className='profile'>
            <button onClick={toggleFormVisibility}><span>+</span></button>
            <div className='circle' onClick={togglePopup}>
              {profile.picture ? (
                <img src={profile.picture} alt='Profile' className='profile-picture' />
              ) : (
                <FaRegCircleUser className='icon' />
              )}
            </div>
          </div>
        </div>
        <div className='to-do-main'>
          {isFormVisible && (
            <form className='main-form' onSubmit={handleSubmit}>
              <div className='task-descriptions'>
                <input 
                  type='text' 
                  name='my-task' 
                  placeholder='Task' 
                  required 
                  value={task} 
                  onChange={handleTaskChange} 
                />
              </div>
              <div className='task-date'>
                <input 
                  type='date' 
                  name='my-date' 
                  placeholder='Date' 
                  required 
                  value={date} 
                  onChange={handleDateChange} 
                />
              </div>
              <div className='task-priority'>
                <label htmlFor="options">Priority</label>
                <select 
                  id="options" 
                  value={priority} 
                  onChange={handlePriorityChange}
                >
                  <option value="none">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className='task-button'>
                <button type='submit'>Approve <FcApproval className='icon'/></button>
              </div>
            </form>
            
            // SNACKBAR

          )}
          <div className='pending'>
            <div className='title'>
              My Tasks <MdOutlinePendingActions className='icon'/>
            </div>
            <div className='tasks'>
              {filteredTasks.map((task, index) => (
                <div 
                  key={index} 
                  className='task-item' 
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  <div className='task-info'>
                    <p>{task.task}</p>
                    <p>{task.date}</p>
                    <p>{task.priority}</p>
                  </div>
                  <div className='task-actions'>
                    <button onClick={() => handleEdit(index)}><BiEdit className='edit-icon'/></button>
                    <button onClick={() => handleDelete(task.id)}><AiFillDelete className='delete-icon'/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POPUPS */}
      {isPopupVisible && <UserPopup profile={profile} onClose={togglePopup} onProfileChange={handleProfileChange} />}
      <CustomizedSnackbars 
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.type}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}

export default Dashboard;
