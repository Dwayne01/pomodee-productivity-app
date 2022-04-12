import React from 'react';
import styled from 'styled-components';
import AvatarImg from '../../components/AvatarImg';

const OnlineUserContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 800px) {
    flex-direction: column;
  }

  @media screen and (max-width: 799px) {
    flex-wrap: wrap;
    flex-direction: row;

    #online-user {
      width: 125px;
    }
  }
`;
const OnlineUsers = ({ onlinePeople, sendSignal, admin }) => {
  return (
    <OnlineUserContainer>
      {onlinePeople.map((onlineuser) => (
        <div
          key={onlineuser.id}
          id="online-user"
          style={{
            cursor: admin ? 'pointer' : 'default'
          }}
          onClick={() => {
            if (admin) {
              sendSignal('admin', { roomName: onlineuser.roomName, username: onlineuser.username, id: onlineuser.id });
            }
          }}
        >
          <AvatarImg
            style={{
              borderRadius: 50,
              transform: onlineuser.hasControl ? 'scale(1.3)' : 'scale(1)',
              border: onlineuser.hasControl ? '2px solid #28ff00' : 'none',
              marginBottom: onlineuser.hasControl ? 10 : 0
            }}
            height="70"
            width="70"
            avatarId={onlineuser.avatar || 1}
          />
          <p style={{ fontSize: 15 }}>{onlineuser.username}</p>
        </div>
      ))}
    </OnlineUserContainer>
  );
};

export default OnlineUsers;
