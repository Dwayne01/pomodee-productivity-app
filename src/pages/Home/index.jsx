import React, { useContext, useEffect, useState } from 'react';
import useSocketIo from '../../hooks/useSocketIo';
import Layout from '../../components/Layout';
import PomodeeTimer from '../../components/PomodeeTimer';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

import './styles.css';
import OnlineUsers from './OnlineUsers';

const Container = styled.div`
  display: flex;

  .singed-out-pomodee-timer {
    transform: translateX(5%);
  }
  .singed-in-pomodee-timer {
    transform: translate(-10%, 10%);
  }

  @media screen and (max-width: 799px) {
    flex-direction: column;
  }

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }

  @media screen and (min-width: 1200px) {
    .singed-in-pomodee-timer {
      position: absolute;
      left: 45%;
      top: 62%;
      transform: translate(-50%, -50%);
    }
    .singed-out-pomodee-timer {
      transform: translateX(20%);
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 799px) {
    #online-users {
      width: 100%;
    }
  }

  @media screen and (min-width: 800px) {
    #online-users {
      width: 20%;
    }
  }
`;

const Home = () => {
  const { isSignedIn, user } = useContext(AuthContext);

  const { roomName } = useParams();
  const [sentSignal, setSentSignal] = useState(false);
  const history = useHistory();

  const { receiveSignal, sendSignal } = useSocketIo();
  const [signalType, setSignalType] = useState('');
  const [onlinePeople, setOnlinePeople] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasControl, setHasControl] = useState(!roomName);

  const [timer, setTimer] = useState({});

  // when a user joins it receives the list of users from the backend
  receiveSignal('new user', (data) => {
    console.log(data);
    setOnlinePeople(data);
    setLoading(false);
  });

  // when the timer controls are pressed
  receiveSignal('action', (type) => setSignalType(type));

  /// when the timer is started
  receiveSignal('timer', (count) => {
    setLoading(false);
    setTimer(count);
  });

  // sends signals when a button is pressed on the timer
  const handleActionSendSignal = (type) => {
    sendSignal('action', type);
  };

  useEffect(() => {
    onlinePeople &&
      onlinePeople.forEach((person) => {
        if (person.username === user.username) {
          setHasControl(person.hasControl);
        }
      });
  }, [onlinePeople, user.username]);

  useEffect(() => {
    if (!user.username) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (onlinePeople && onlinePeople.length === 0) {
      history.replace('/home');
      window.location.reload();
    }
  }, [history, onlinePeople]);

  useEffect(() => {
    if (!sentSignal && user) {
      const userInfo = {
        username: user.username || 'pomodee',
        email: user.email,
        avatar: user.avatar || 0,
        hasControl,
        roomName: roomName ? roomName : user.username
      };
      sendSignal('join room', userInfo);
      setSentSignal(true);
    }
  }, [hasControl, roomName, sendSignal, sentSignal, user, user.avatar, user.email, user.username]);

  return (
    <Layout>
      <Container>
        <PomodeeTimer
          user={user}
          hasControl={hasControl}
          isSignedIn={isSignedIn}
          handleActionSendSignal={handleActionSendSignal}
          signalType={signalType}
          timer={timer}
          loading={loading}
          roomName={roomName || user.username}
        />
        {isSignedIn && (
          <div id="online-users">
            <OnlineUsers sendSignal={sendSignal} admin={!roomName} onlinePeople={onlinePeople || []} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
