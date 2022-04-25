import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import Analysis from '../svgs/Analysis';
// import Bell from '../svgs/Bell';
import Friends from '../svgs/Friends';
import HallOfFame from '../svgs/HallOfFame';
import Timer from '../svgs/Timer';
// import User from '../svgs/User';
import {BiLogOut} from 'react-icons/bi';


const Sidebar = () => {
  const { logout } = useLogout();

  return (
    <div className='xs:hidden md:block w-72 p-3 self-center'>
      <div id="navBarWrapper">
        <ul>
          <li className='text-lg'>
            <Link to="/home" className="flex hover:bg-pomodee-orange-100 w-5/6 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
              <Timer className="mr-3" width={30} height={25} />
              Timer
            </Link>
          </li>
          <li className='text-lg mt-3'>
             <Link to="/stats" className="flex hover:bg-pomodee-orange-100 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
              <Analysis className="mr-3"  width={30} height={25}/>
              My Stats
            </Link>
          </li>
          <li className='text-lg mt-3'>
            <Link to="/friends" className="flex hover:bg-pomodee-orange-100 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
              <Friends className="mr-3" width={30} height={25} />
              Friends
            </Link>
          </li>
          <li className='text-lg mt-3'>
            <Link to="/hallOfFame" className="flex hover:bg-pomodee-orange-100 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
              <HallOfFame className="mr-3 mt-1" width={30} height={25} />
              Hall of Fame
            </Link>
          </li>
          {/* <li  className='text-lg mt-3'>
            <Link to="/notifications" className="flex hover:bg-pomodee-orange-100 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100" >
              <Bell className="mr-2" width={30} height={25} />
              Notifications
            </Link>
          </li>

          <li className='text-lg mt-3'>
            <Link to="/profile" className="flex hover:bg-pomodee-orange-100 px-3 py-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
              <User className="mr-2" width={30} height={25} />
              Profile
            </Link>
          </li> */}

          <li className="flex hover:bg-pomodee-orange-100 text-lg px-3 py-2 mt-2 hover:rounded-full align-middle hover:text-white text-pomodee-purple-100">
            <BiLogOut size={30} />
            <p className='ml-3 mb-0' onClick={logout}>Log Out</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
