import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getFriendsList, searchFriends, unFriendUser } from '../../services/friends.services';
import { AuthContext } from '../../context/AuthContext';
import { createRequests } from '../../services/request.services';
import StatsChart from '../../components/StatsChart';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ProgressAvatar from '../../components/ProgressAvatar';
import './styles.css';
import FriendsList from '../../components/FriendsList/FriendsList';
import AvatarImg from '../../components/AvatarImg';
import debounce from 'lodash.debounce';
const BtnStyle = styled.div`
  Button {
    color: #f24507 !important;
    border-radius: 1000px;
    width: 85px;
    height: 30px;
    box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
    padding: 0;
    font-weight: 600;
    transform: translateY(1rem);
  }
`;

const ProgressStyle = styled.div`
  @media screen and (min-width: 1200px) {
    margin-top: 10%;
    margin-left: -10%;
    transform: translateX(2rem);
    h2.stats-title {
      font-size: 1rem;
    }
    p.stats-date {
      margin-bottom: 15px;
    }
  }
`;

const AvatarWrapper = styled.div`
  margin-bottom: 50px;
  width: 80%;
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friend, setFriend] = useState({});
  const [myfriends, setMyFriend] = useState([]);
  const { user: userInfo } = useContext(AuthContext);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleGetFriendList = async () => {
    if (userInfo) {
      const result = await getFriendsList(userInfo._id);
      if (result) {
        setFriends(result);
        setMyFriend(result);
      }

      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setLoading(true);
    if (!value) {
      setTimeout(async function () {
        handleGetFriendList();
      }, 2000);
      return;
    }

    debouncedFetchData(value, setLoading);
  };

  const debouncedFetchData = debounce(async (data, setLoading) => {
    let result = await searchFriends(data);
    console.log({ result });
    if (result) setFriends(result);

    setLoading();
  }, 1000);

  const handleFriendSelect = (friend) => {
    setFriend(friend);

    const available = myfriends.find((data) => data._id === friend._id);

    if (available) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  };

  const unfollowFriend = async (friend) => {
    const params = {
      userId: userInfo._id,
      friendId: friend
    };
    const result = await unFriendUser(params);

    if (result) {
      handleGetFriendList();
      setFriend(friend);
      setIsFriend(false);
    }
  };

  const followFriend = async (friend) => {
    const params = {
      sendersEmail: userInfo.email,
      sendersId: userInfo._id,
      roomName: userInfo.roomName,
      userId: friend._id,
      username: userInfo.username,
      requestType: 'friend'
    };

    const result = await createRequests(params);

    if (result) {
      handleGetFriendList();
      setIsFriend(true);
    }
  };

  return (
    <Layout>
      <div
        style={{
          width: '25vw',
          display: 'flex',
          marginTop: '60px',
          marginLeft: '5%'
        }}
      >
        <FriendsList
          className="friendsList"
          friends={friends}
          loading={loading}
          selectFriend={handleFriendSelect}
          handleSearch={handleSearch}
        />

        <div
          className="friendsStatPage"
          style={{
            marginLeft: 50,
            paddingLeft: 50,
            width: '100%',
            marginRight: 20,
            borderLeft: '1px solid gray'
          }}
        >
          {friend.username && (
            <>
              <div
                style={{
                  display: 'flex',
                  paddingBottom: 10,
                  borderBottom: '1px solid gray',
                  justifyContent: 'space-between'
                }}
              >
                <div className="user" style={{ display: 'flex' }}>
                  <p style={{ fontSize: 18, fontWeight: 'bold' }}>
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

                <BtnStyle>
                  {isFriend ? (
                    <Button variant="light" onClick={() => unfollowFriend(friend._id)}>
                      unfollow
                    </Button>
                  ) : (
                    <Button variant="light" onClick={() => followFriend(friend)}>
                      follow
                    </Button>
                  )}
                </BtnStyle>
              </div>
              <ProgressStyle>
                <AvatarWrapper>
                  <ProgressAvatar {...friend} />
                </AvatarWrapper>
                <StatsChart user={friend} />
              </ProgressStyle>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Friends;
