import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import hamburgerIcon from './images_layout/icon_hamburgerMenu.svg';
import { Link } from 'react-router-dom';
import Bell from '../svgs/Bell';
import AddUser from '../svgs/AddUser';
import User from '../svgs/User';
import Logo from '../svgs/Logo';
import useLogout from '../../hooks/useLogout';
import ProgressAvatar from '../ProgressAvatar';
import { NotificationContext } from '../../context/NotificationContext';
import { handleGetNotification } from '../../util.js/getNotifications';
import AvatarImg from '../AvatarImg';
import { getFriendsList } from '../../services/friends.services';
import { createRequests } from '../../services/request.services';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: grid;
  justify-content: space-between;
  padding: 20px;

  .logo {
    width: 20%;
  }

  #notification {
    position: relative;
  }

  .dot {
    border-radius: 50px;
    padding: 2px;
    width: 25px;
    height: 25px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    background-color: #f34506;
    position: absolute;
    top: -7px;
    left: 17px;
    border: 3px solid white;
  }

  /* img#hamburgerIcon {
    transition: all 0.5s ease;
  } */
  img#logo {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
    width: 80px;
    height: auto;
  }
  /* ---------- Header bar for tablet and desktop view ----------*/

  div#desktopHeaderBar {
    display: flex;
    height: 40px;
    justify-content: end;
    align-items: center;
    gap: 55px;
    svg {
      width: 35px;
      &:first-child {
        &: hover {
          cursor: pointer;
          g path {
            fill: #f34506;
          }
        }
      }
      &: nth-child(2) {
        width: 33px;
      }
      &:hover {
        cursor: pointer;
        path.navy {
          fill: #f34506;
        }
      }
    }
    /* ---------- Profile setting popup ----------*/
    div#profileIconInHeader {
      position: relative;
      div#profileIconPopUp {
        z-index: 100;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 9px 4px rgba(0, 0, 0, 0.25);
        border-radius: 35px;
        background-color: white;
        width: 180px;
        height: 170px;
        position: absolute;
        top: 55px;
        left: -140px;

        a {
          color: #3928b1;
          display: block;
          width: 70%;
          text-align: left;
          &:last-child {
            color: #f34303;
          }
        }
      }
    }
  }

  @media screen and (max-width: 799px) {
    div#desktopHeaderBar {
      order: 2;
      grid-column: 2/3;
      display: none;
    }

    .logo {
      width: 20%;
      order: 1;
      grid-column: 1/2;
    }
    #crossIconWrapper {
      display: none;
    }

    #profileIconInHeader {
      display: none;
    }

    #notification {
      display: none;
    }
  }

  @media screen and (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    #crossIconWrapper {
      display: none;
    }

    #profileIconInHeader {
      display: flex;
    }
    #notification {
      display: flex;
    }
  }
`;

const ContainerLoggedOutHeader = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  .auth {
    display: 'flex';
  }

  .login {
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    margin: 0px 20px;
    background-color: #fff;
    color: #3928b1;
  }

  .signup {
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    border: 1px solid #fff;
    background-color: #3928b1;
    color: #fff;
  }
`;

/* const friendListStyle = {
  position: 'absolute',
  boxShadow: '0px 4px 9px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '35px',
  right: 100,
  top: '70px',
  padding: '14px',
  width: '320px',
  margin: 0,
  zIndex: 900,
  backgroundColor: '#fff'
}; */

/* Another way to style the friend list, to use media query */
const FriendListStyle = styled.div`
  position: absolute;
  box-shadow: 0px 4px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 35px;
  right: 100px;
  top: 70px;
  padding: 14px;
  width: 320px;
  margin: 0;
  z-index: 999;
  background-color: #fff;
  @media screen and (max-width: 450px) {
    right: -150%;
    top: 5vh;
  } ;
`;

const friendListItem = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  paddingRight: '15px'
};

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const friendListUlStyle = {
  marginTop: '14px',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0
};

const inviteBtn = {
  padding: '0.3rem 0.5rem',
  boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.25)',
  borderRadius: '10px',
  background: '#fff',
  color: 'blue',
  outline: 'none',
  border: 'none',
  fontSize: '12pt',
  fontWeight: 'bold'
};

const HamburgerIconWrapper = styled.div`
  position: absolute;
  right: 7vw;
  @media screen and (min-width: 450px) {
    display: none;
  } ;
`;

const ProgressAvatarWrapper = styled.div`
 @media screen and (max-width: 450px) {
    display: none;
 }
  @media screen and (min-width: 800px) {
    transform: translateX(-15%);
  }
`;

const FriendList = ({ user, invite }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setLoading(true);
    getFriendsList(user._id)
      .then((res) => setFriendList(res))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <FriendListStyle>
      <div id="friend-invite-list" /* style={friendListStyle} */>
        {loading ? (
          <div style={spinnerStyle}>
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <ul style={friendListUlStyle}>
            {friendList.map((friend) => {
              return (
                <li style={friendListItem} key={friend._id}>
                  <AvatarImg
                    alt="userPic"
                    style={{ borderRadius: 50 }}
                    height={60}
                    width={60}
                    size={4}
                    avatarId={friend.avatar || 1}
                  />
                  <h4 style={{ fontSize: '14pt', marginLeft: '1rem', marginRight: 'auto' }}>{friend.username}</h4>
                  <button style={inviteBtn} onClick={() => invite(friend)}>
                    Invite
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </FriendListStyle>
  );
};

const LoggedOutHeader = ({ handleToggleAuth, isAuth }) => {
  return (
    <ContainerLoggedOutHeader>
      <Logo color="#fff" />
      <div className="auth">
        {!isAuth && (
          <button
            className="login"
            onClick={() => {
              handleToggleAuth('login');
            }}
          >
            Login
          </button>
        )}
        {!isAuth && (
          <button
            className="signup"
            onClick={() => {
              handleToggleAuth('signup');
            }}
          >
            Signup
          </button>
        )}
      </div>
    </ContainerLoggedOutHeader>
  );
};

const LoggedInHeader = ({ username, setUser, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const invite = async (friend) => {
    const params = {
      sendersEmail: user.email,
      sendersId: user._id,
      userId: friend._id,
      username: user.username,
      requestType: 'room',
      avatar: user.avatar,
      roomName: user.username
    };
    await createRequests(params).then((res) => setIsOpen(false));
  };

  const { logout } = useLogout(setUser, user);

  const { notifications, setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    handleGetNotification(user, setNotifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openHamburgerMenu = () => {
    const navBar = document.getElementById('navBarWrapper');
    navBar.style.left = '0%';
  };

  const openProfileIconPopUp = () => {
    const profileIconPopUp = document.getElementById('profileIconPopUp');
    if (profileIconPopUp.style.display === 'none') {
      profileIconPopUp.style.display = 'flex';
    } else {
      profileIconPopUp.style.display = 'none';
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  document.addEventListener(
    'click',
    (e) => {
      const friendsListModal = document.getElementById('friend-invite-list');

      if (friendsListModal && !friendsListModal.contains(e.target)) {
        setIsOpen(false);
      }
      const profileIconPopUp = document.getElementById('profileIconPopUp');
      profileIconPopUp.style.display = 'none';
    },
    true
  );

  return (
    <Container>
      <div className="logo">
        <Logo color="#3928b1" />
      </div>

      {window.location.pathname === '/home' || window.location.pathname.includes('/timer') ? (
          <ProgressAvatarWrapper style={{ transform: 'translateX(-5px)'}}>
            <ProgressAvatar {...user} />
          </ProgressAvatarWrapper>
      ) : null}

      <div id="desktopHeaderBar">
        <Link id="notification" to="/notifications">
          <Bell size={10} />
          {notifications.length > 0 && <div className="dot">{notifications.length}</div>}
        </Link>
        <div>
          <div onClick={toggleModal}>
            <AddUser />
          </div>
          <div>{isOpen && <FriendList user={user} invite={invite} />}</div>
        </div>
        <div id="profileIconInHeader">
          <div onClick={openProfileIconPopUp}>
            <User />
          </div>
          <div id="profileIconPopUp">
            {user && <AvatarImg style={{ borderRadius: 50 }} height={70} width={70} avatarId={user.avatar} />}
            <p>{username}</p>
            <div style={{ textAlign: 'left' }}>
              <Link to="/profile">Profile</Link>
              <p style={{ color: '#f34506', cursor: 'pointer' }} onClick={logout}>
                Log Out
              </p>
            </div>
          </div>
        </div>
      </div>
      <HamburgerIconWrapper>
        <img id="hamburgerIcon" src={hamburgerIcon} width="30" alt="hamburger icon" onClick={openHamburgerMenu} />
      </HamburgerIconWrapper>
    </Container>
  );
};

const Header = ({ isAuth, setIsAuth, setUser, user, username, handleToggleAuth, isSignedIn }) => {
  return (
    <>
      {!isSignedIn && <LoggedOutHeader handleToggleAuth={handleToggleAuth} isAuth={isAuth} />}
      {isSignedIn && (
        <LoggedInHeader setUser={setUser} user={user} username={username} isAuth={isSignedIn} setIsAuth={setIsAuth} />
      )}
    </>
  );
};

export default Header;
