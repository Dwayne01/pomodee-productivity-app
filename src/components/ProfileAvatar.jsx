import React, { useState } from 'react';
import styled from 'styled-components';
import { updateAvatar } from '../services/auth.services';
import { AvatarDictionary } from './AvatarImg';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled.div`
  .avatar {
    width: 43%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    grid-gap: 30px;
    transform: translateY(-2.3rem);
  }

  .avatar img:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  button {
    margin: auto;
  }

  h1 {
    text-align: center;
  }
`;

const ProfileAvatar = ({ username, avatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatar || 0);
  const history = useHistory();
  const handleOnClick = async (value) => {
    setSelectedAvatar(value);
    try {
      await updateAvatar({ username, avatar: value });

      history.replace('/home');
    } catch (error) {
      notification.open({
        message: 'User Avatar Update',
        description: 'Failed to update avatar',
        style: {
          backgroundColor: '#ff0033',
          color: 'white'
        }
      });
    }
  };

  return (
    <StyledContainer>
      <h1 style={{ marginBottom: 70 }}>Select an Avatar</h1>
      <div className="avatar">
        {Object.values(AvatarDictionary).map((avatar, key) => (
          <div key={key}>
            <input onChange={() => handleOnClick(key + 1)} checked={selectedAvatar === key + 1} type="checkbox" />
            <img alt="avatar" onClick={() => handleOnClick(key + 1)} src={avatar} />
          </div>
        ))}
      </div>
    </StyledContainer>
  );
};

export default ProfileAvatar;
