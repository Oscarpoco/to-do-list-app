import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import { LuListTodo } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import SearchInput from './search';
import UserPopup from './UserPopup';
import Loader from './Loader';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";

function Dashboard({ setIsAuthenticated }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("none");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [profile, setProfile] = useState({
    username: '',
    picture: '',
    password: ''
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/tasks?userId=${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("There was an error fetching the tasks!", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 2000);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (task && date && priority !== "none") {
      const newTask = { task, date, priority, userId };

      if (isEditing) {
        try {
          const response = await axios.put(`http://localhost:3030/tasks/${tasks[editIndex].id}`, newTask);
          const updatedTasks = tasks.map((t, index) =>
            index === editIndex ? response.data : t
          );
          setTasks(updatedTasks);
          setIsEditing(false);
          setEditIndex(null);
        } catch (error) {
          console.error("There was an error updating the task!", error);
        }
      } else {
        try {
          const response = await axios.post('http://localhost:3030/tasks', newTask);
          setTasks([...tasks, response.data]);
        } catch (error) {
          console.error("There was an error adding the task!", error);
        }
      }

      setTask("");
      setDate("");
      setPriority("none");
      setIsFormVisible(false);
    }
  };

  const handleEdit = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setDate(taskToEdit.date);
    setPriority(taskToEdit.priority);
    setIsFormVisible(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:3030/tasks/${tasks[index].id}`);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("There was an error deleting the task!", error);
    }
  };

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "rgba(255, 0, 0, 0.227)";
      case "Medium":
        return "rgba(255, 255, 0, 0.252)";
      case "Low":
        return "rgba(0, 128, 0, 0.277)";
      default:
        return "white";
    }
  };

  if (isLoading) {
    return <Loader name="Processing" />;
  }

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
            <SearchInput />
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
            <form className='main-form' onSubmit={handleFormSubmit}>
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
          )}
          <div className='pending'>
            <div className='title'>
              My Tasks <MdOutlinePendingActions className='icon'/>
            </div>
            <div className='tasks'>
              {tasks.map((task, index) => (
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
                    <button onClick={() => handleDelete(index)}><AiFillDelete className='delete-icon'/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && <UserPopup profile={profile} onClose={togglePopup} onProfileChange={handleProfileChange} />}
    </div>
  );
}

export default Dashboard;
