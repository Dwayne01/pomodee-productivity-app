import React, { useContext, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import cx from 'classnames';
import styled from 'styled-components';
import SignIn from '../../pages/Auth/Signin';
import SignUp from '../../pages/Auth/Signup';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import useUserInfo from '../../hooks/useUserInfo';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';

const LoaderPageStyle = styled.div`
  margin: auto;
  height: 100vh;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingPage = ({ antIcon }) => {
  return (
    <LoaderPageStyle>
      <Spin indicator={antIcon} />
    </LoaderPageStyle>
  );
};

const Layout = ({ children }) => {
  const { isSignedIn, isAuth, user, setIsAuth, setIsSignedIn } = useContext(AuthContext);
  const history = useHistory();

  const { userId, setUser } = useUserInfo();

  const [color, setColor] = useState('bg-pomodee-purple-100');
  const [authType, setAuthType] = useState('login');
  const antIcon = <LoadingOutlined style={{ color: '#F34506', fontSize: 24 }} spin />;

  useEffect(() => {
    if (!user) return;
    setColor('bg-white');
    setIsSignedIn(true);
  }, [setIsSignedIn, user]);


  useEffect(() => {
    if (!userId && history.location.pathname !== '/') {
      history.replace('/home');
    }
    // fix put user into an array
  }, [userId, history]);

  if (!user && userId) return <LoadingPage antIcon={antIcon} />;
  /* Get the current url and pass the directory to sidebar component to indicate current page */
  const currentUrl = window.location.href;
  let selectedPage;
  if (currentUrl.includes('friends')) {
    selectedPage = 'friends';
  } else if (currentUrl.includes('stats')) {
    selectedPage = 'stats';
  } else if (currentUrl.includes('hallOfFame')) {
    selectedPage = 'hallOfFame';
  } else {
    selectedPage = 'timer';
  }

  const handleToggleAuth = (type) => { 
    if (type === 'close') { 
      setIsAuth(false);
      return
    }
    setAuthType(type)
    setIsAuth(true);
  }

  return (
    <div className={cx("h-screen overflow-scroll", color)}>
      <Header
        username={user ? user.username : ''}
        isAuth={isAuth}
        isSignedIn={isSignedIn}
        handleToggleAuth={handleToggleAuth}
        setIsAuth={setIsAuth}
        setUser={setUser}
        user={user}
      />
      <div className='flex xs:flex-col md:flex-row h-3/4'>
        {isSignedIn && <Sidebar selectedPage={selectedPage} />}
        <div className="w-screen xs:order-2 md:order-1">{children}</div>
        {!isSignedIn && (
          <div className='xs:order-1 md:order-2'>
            {isAuth && (
              <>
                {authType === 'login' ? <SignIn toggleSignIn={handleToggleAuth} /> : <SignUp toggleSignUp={handleToggleAuth} />}
              </>
            )}
          </div>
        )}
      </div>
      <Footer isSignedIn={isSignedIn} />
    </div>
  );
};

export default React.memo(Layout);
