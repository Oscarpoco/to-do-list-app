import './dashboard.css';

import { LuListTodo } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import DateCalendarReferenceDate from './calender';



function Dashboard(){

    return(
        <div className='dashboard'>
            <div className='menu-box'>
                <div className='top'>
                    <div className='logo'>
                        <h3>Lis<span>tify</span><LuListTodo className='icon'/></h3>
                    </div>
                    <div className='menu'>
                        <button><MdDashboardCustomize className='icon'/>Dashboard</button>
                    </div>
                </div>
                <div className='middle'></div>
                <div className='bottom'>
                    <button><RiLogoutBoxLine className='icon'/> Logout</button>
                </div>
            </div>
            <div className='to-do-box'>
                <div className='searchNav'>
                    <input type='text' id='search' placeholder='Search' ></input>
                    <div className='profile'>
                        <button><span>+</span> New Task</button>
                        <div className='circle'>
                            <FaRegCircleUser className='icon'/>
                        </div>
                    </div>
                </div>
                <div className='to-do-main'>
                    <div className='calender-box'>
                        
                    </div>
                    <div className='pending-box'></div>
                    <div className='completed-box'></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;