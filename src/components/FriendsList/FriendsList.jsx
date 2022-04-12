import React from 'react';
import styled from 'styled-components';
import Scrollbars from 'react-custom-scrollbars';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AvatarImg from '../AvatarImg';

const FriendsBox = styled.div`
  input {
    height: 50px;
    width: 400px;
    border-radius: 30px;
    border: 1px solid $grey-base;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    background-color: #f4f4f4;
    background: url(images/search_icon.png) no-repeat;
    background-position: 3% 50%;
    padding-left: 50px;
  }
  .user {
    margin-left: 10px;
  }
  p {
    padding-top: 15px;
    border-top: solid gray 0.5px;
    width: 380px;
    font-weight: 600;
  }
`;

function FriendsList({ friends, handleSearch, loading, selectFriend }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="FriendsList">
      <FriendsBox>
        <input
          type="text"
          className="searchBar"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <Scrollbars style={{ width: 400, height: 500 }}>
          {!loading ? (
            friends.map((friend) => {
              return (
                <div
                  className="user"
                  style={{ cursor: 'pointer', display: 'flex' }}
                  onClick={() => selectFriend(friend)}
                  key={friend.id}
                >
                  <p>
                    <AvatarImg
                      alt="userPic"
                      style={{ borderRadius: 50 }}
                      height={60}
                      width={60}
                      size={4}
                      avatarId={friend.avatar || 1}
                    />{' '}
                    &nbsp;
                    {friend.username}
                  </p>
                </div>
              );
            })
          ) : (
            <Spin indicator={antIcon} />
          )}
        </Scrollbars>
      </FriendsBox>
    </div>
  );
}

export default FriendsList;
