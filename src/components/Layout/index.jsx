import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SignIn from '../../pages/Auth/Signin';
import SignUp from '../../pages/Auth/Signup';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import useUserInfo from '../../hooks/useUserInfo';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: center;

  .auth-container {
    border-left: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 799px) {
  }

  @media screen and (min-width: 800px) {
    .body-container {
      padding: 20px;
      width: 100%;
    }
  }
`;

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

  const [color, setColor] = useState('#3928B1');
  const [toggleAuth, setToggleAuth] = useState(false);
  const antIcon = <LoadingOutlined style={{ color: '#F34506', fontSize: 24 }} spin />;

  useEffect(() => {
    if (!user) return;
    setColor('white');
    setIsSignedIn(true);
  }, [setIsSignedIn, user]);

  const handleToggleAuth = (type) => {
    setIsAuth(true);
    if (type === 'login') {
      setToggleAuth(true);
      return;
    }
    if (type === 'signup') {
      setToggleAuth(false);
      return;
    }
    setToggleAuth(!toggleAuth);
  };

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
  return (
    <div style={{ background: color, height: '100vh', overflowY: 'scroll' }}>
      <Header
        username={user ? user.username : ''}
        isAuth={isAuth}
        isSignedIn={isSignedIn}
        handleToggleAuth={handleToggleAuth}
        setIsAuth={setIsAuth}
        setUser={setUser}
        user={user}
      />
      <Container isAuth={isSignedIn}>
        {isSignedIn && <Sidebar selectedPage={selectedPage} />}
        <div className="body-container">{children}</div>
        {!isSignedIn && (
          <>
            {isAuth && (
              <div className="auth-container">
                {toggleAuth ? <SignIn toggleSignIn={handleToggleAuth} /> : <SignUp toggleSignUp={handleToggleAuth} />}
              </div>
            )}
          </>
        )}
      </Container>
      <Footer isSignedIn={isSignedIn} />
    </div>
  );
};

export default React.memo(Layout);
