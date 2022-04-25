import React from 'react';
import AvatarImg from '../../components/AvatarImg';
import cx from 'classnames';

const OnlineUsers = ({ onlinePeople, sendSignal, admin }) => {
  return (
    <div className='xs:flex md:block  m-auto lg:block p-10 xs:overflow-x-scroll'>
      {onlinePeople.map((onlineuser) => (
        <div className='flex flex-column text-center mx-3'>
          <div
            key={onlineuser.id}
            className={cx('w-[6rem]', admin && 'cursor-pointer')}
            onClick={() => {
              if (admin) {
                sendSignal('admin', { roomName: onlineuser.roomName, username: onlineuser.username, id: onlineuser.id });
              }
            }}
          >
            <AvatarImg
              className={cx("rounded-full ", onlineuser.hasControl && "ring-2 ring-[#28ff00]")}
              avatarId={onlineuser.avatar || 1}
            />
            </div>
            <p className='text-lg mt-1 w-[6rem]'>{onlineuser.username}</p>
          </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
