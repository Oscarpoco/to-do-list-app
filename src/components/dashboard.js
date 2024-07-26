import './dashboard.css';
import React, { useState } from 'react';
import { LuListTodo } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import AddItems from './items';
import CurrentTime from './CurrentTime';

function Dashboard() {
    const [items, setItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
  
    const addItem = () => {
      setItems([...items, { id: Date.now(), text: `Task ${items.length + 1}` }]);
    };
  
    const deleteItem = (id) => {
      const newItems = items.filter(item => item.id !== id);
      const completedItem = items.find(item => item.id === id);
      setItems(newItems);
      setCompletedItems([...completedItems, completedItem]);
    };
  
    return (
      <div className='dashboard'>
        <div className='menu-box'>
          <div className='top'>
            <div className='logo'>
              <h3>Lis<span>tify</span><LuListTodo className='icon' /></h3>
            </div>
            <div className='menu'>
              <button><MdDashboardCustomize className='icon' />Dashboard</button>
            </div>
          </div>
          <div className='middle'>
            <CurrentTime />
            <div className='text'>
              <h2>Master Your Day, Every Day</h2>
              <h3>Lis<span>tify</span><LuListTodo className='icon' /></h3>
            </div>
          </div>
          <div className='bottom'>
            <button><RiLogoutBoxLine className='icon' /> Logout</button>
          </div>
        </div>
        <div className='to-do-box'>
          <div className='searchNav'>
            <input type='text' id='search' placeholder='Search' />
            <div className='profile'>
              <button onClick={addItem}><span>+</span> New Task</button>
              <div className='circle'>
                <FaRegCircleUser className='icon' />
              </div>
            </div>
          </div>
          <div className='to-do-main'>
            <div className='pending'>
              <div className='title'>
                Pending Tasks <MdOutlinePendingActions className='icon'/>
              </div>
              <div className='tasks'>
                <AddItems items={items} onDelete={deleteItem} />
              </div>
            </div>
            <div className='completed'>
              <div className='title'>Completed Tasks <IoCheckmarkDoneCircleOutline className='icon'/></div>
              <div className='tasks'>
                <AddItems items={completedItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;