import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Bell from "../svgs/Bell";
import AddUser from "../svgs/AddUser";
import Logo from "../svgs/Logo";
import ProgressAvatar from "../ProgressAvatar";
import { NotificationContext } from "../../context/NotificationContext";
import { handleGetNotification } from "../../util.js/getNotifications";
import AvatarImg from "../AvatarImg";
import { getFriendsList } from "../../services/friends.services";
import { createRequests } from "../../services/request.services";
import { LoadingOutlined } from "@ant-design/icons";


const ContainerLoggedOutHeader = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

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
  }
`;

const friendListItem = {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  padding: 0,
  margin: 0,
  paddingRight: "15px",
};

const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const friendListUlStyle = {
  marginTop: "14px",
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: 0,
};

const inviteBtn = {
  padding: "0.3rem 0.5rem",
  boxShadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
  background: "#fff",
  color: "blue",
  outline: "none",
  border: "none",
  fontSize: "12pt",
  fontWeight: "bold",
};


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
                  <h4 style={{ fontSize: "14pt", marginLeft: "1rem", marginRight: "auto" }}>{friend.username}</h4>
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
      <div>
        {!isAuth && (
          <button
            className="border bg-white text-pomodee-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-800 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handleToggleAuth("login");
            }}
          >
            Login
          </button>
        )}
        {!isAuth && (
          <button
            className="border text-white focus:outline-none focus:ring-4 focus:ring-purple-800 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handleToggleAuth("signup");
            }}
          >
            Signup
          </button>
        )}
        {isAuth && (
          <button
            className="border text-white focus:outline-none focus:ring-4 focus:ring-purple-800 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handleToggleAuth("close");
            }}
          >
            Close
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
      requestType: "room",
      avatar: user.avatar,
      roomName: user.username,
    };
    await createRequests(params).then((res) => setIsOpen(false));
  };

  const { notifications, setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    handleGetNotification(user, setNotifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  // const toggleModal = () => {
  //   setIsOpen(!isOpen);
  // };

  // document.addEventListener(
  //   "click",
  //   (e) => {
  //     const friendsListModal = document.getElementById("friend-invite-list");

  //     if (friendsListModal && !friendsListModal.contains(e.target)) {
  //       setIsOpen(false);
  //     }
  //     const profileIconPopUp = document.getElementById("profileIconPopUp");
  //     profileIconPopUp.style.display = "none";
  //   },
  //   true
  // );

  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <a className="w-3/12  md:order-1" href="/home">
          <Logo color="#3928b1" />
        </a>
        <div class="flex items-center md:order-3 xs:w-9/12 md:w-72 lg:w-72 justify-center"> 
            <Link className="w-1/3 flex relative justify-end text-pomodee-purple-100" id="notification" to="/notifications">
             <Bell  width={35}  />
             {notifications.length > 0 && <span class="top-0 left-15 absolute  w-3.5 h-3.5 bg-pomodee-orange-100 border-2 border-white dark:border-gray-800 rounded-full"></span>}
            </Link> 
            <div className="w-1/3 flex justify-end">
              <div className="text-pomodee-purple-100">
                <AddUser width={35} />
              </div>
              <div>{isOpen && <FriendList user={user} invite={invite} />}</div>
            </div>
            <div className="md:hidden w-1/2 flex justify-end" >
              <button type="button" class="text-gray-700 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Menu</button>
            </div>
          </div>
        <div class="justify-between m-auto  md:order-2 items-center md:flex xs:w-64 sm:w-72 md:w-auto">
           {window.location.pathname === "/home" || window.location.pathname.includes("/timer") ? (
              <ProgressAvatar {...user} />
          ) : null}
        </div>
      </div>
    </nav>
  );
};

const Header = ({ isAuth, setIsAuth, setUser, user, username, handleToggleAuth, isSignedIn }) => {
  return (
    <div className="h-40">
      {!isSignedIn && <LoggedOutHeader handleToggleAuth={handleToggleAuth} isAuth={isAuth} />}
      {isSignedIn && (
        <LoggedInHeader setUser={setUser} user={user} username={username} isAuth={isSignedIn} setIsAuth={setIsAuth} />
      )}
    </div>
  );
};

export default Header;
