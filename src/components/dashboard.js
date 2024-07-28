import './dashboard.css';
import React, { useState } from 'react';
import { LuListTodo } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import AddItems from './items';
import CurrentTime from './CurrentTime';
import SearchInput from './search';
import UserPopup from './UserPopup';

function Dashboard({setIsAuthenticated}) {
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      task: `Task ${items.length + 1}`,
      priority: 'Medium' ,
      dueDate: new Date().toISOString().slice(0, 16)
    }]);
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    const completedItem = items.find(item => item.id === id);
    setItems(newItems);
    setCompletedItems([...completedItems, completedItem]);
  };

  const updateItem = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const HandleLogout = () =>{

    setIsAuthenticated(false);
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
          <CurrentTime />
        </div>
        <div className='bottom'>
          <button onClick={HandleLogout}><RiLogoutBoxLine className='icon' /> Logout</button>
        </div>
      </div>
      <div className='to-do-box'>
        <div className='searchNav'>
          <div className='search'>
            <SearchInput />
          </div>
          <div className='profile'>
            <button onClick={addItem}><span>+</span> New</button>
            <div className='circle' onClick={togglePopup}>
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
              <AddItems items={items} onDelete={deleteItem} onUpdate={updateItem} />
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
      {isPopupVisible && <UserPopup onClose={togglePopup} />}
    </div>
  );
}

export default Dashboard;