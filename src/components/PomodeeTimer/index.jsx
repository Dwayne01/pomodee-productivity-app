import React, { useCallback, useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BsPlayFill, BsPause, BsStopFill } from 'react-icons/bs';
import { Progress } from 'antd';
import bell from '../PomodeeTimer/bell-ringing-05.mp3';
import { addCycle, saveCycles } from '../../services/auth.services';
import cx from 'classnames';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${(props) => (props.isSignedIn ? '#281998' : '#fff')};
  }
  .timer-refresh-button {
    stroke-width: 1;
  }
  .timer-cancel-button {
    stroke-width: 7;
  }
  .timer-pause-button {
    stroke-width: 1;
    transform: translateX(5px);
  }
  .timer-play-button {
    transform: translateX(10px);
    @media screen and (max-width: 400px) {
      transform: translateX(0px);
    }
  }

  .ant-progress-text {
    font-size: 4rem;
    font-weight: bold;
    color: ${(props) => (props.isSignedIn ? '#281998' : '#fff')} !important;
  }

  @media screen and (max-width: 799px) {
    width: 100%;

    .control-panel {
      width: 75%;
    }
  }

  @media screen and (min-width: 800px) {
    width: ${(props) => (props.isAuth ? '80%' : '100%')};

    transform: ${(props) => (props.isSignedIn ? 'translate(-2vw, 5vh)' : 'translateY(0)')};

    .control-panel {
      width: 45%;
    }
  }
`;

const LoaderPageStyle = styled.div`
  margin: auto;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 799px) {
    height: 65vh;
  }

  @media screen and (min-width: 800px) {
    height: 60vh;
  }
`;

const PomodeeTimer = ({
  signalType,
  hasControl,
  timer: countDown,
  roomName,
  handleActionSendSignal,
  user,
  loading,
  isSignedIn
}) => {
  const [time, setTime] = useState('');
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    if (!cycle && !countDown.cyle) {
      return;
    }

    if (countDown.cycle === cycle) {
      return;
    }

    if (!cycle && countDown.cycle === 0) {
      return;
    }

    setCycle(countDown.cycle);

    const cycleData = {
      email: user.email,
      cycleData: {
        completedAt: Date.now(),
        completedBy: user.email
      }
    };

    const userCycles = {
      username: user.username,
      cycles: user.cycles
    };

    addCycle(cycleData);
    saveCycles(userCycles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle, countDown.cycle]);

  /* Add a new cycle when a cycle completes: ENDS here - Hiroshi */

  const reset = useCallback(() => {
    handleActionSendSignal({ action: 'reset', roomName: roomName || 'pomodee' });
  }, [handleActionSendSignal, roomName]);

  const close = useCallback(() => {
    handleActionSendSignal({ action: 'stop', roomName: roomName || 'pomodee', username: user.username || 'pomodee' });
  }, [handleActionSendSignal, roomName, user.username]);

  const pause = useCallback(() => {
    handleActionSendSignal({ action: 'pause', roomName: roomName || 'pomodee' });
  }, [handleActionSendSignal, roomName]);

  const play = useCallback(() => {
    var sound = new Howl({
      src: bell
    });
    Howler.volume(1.0);

    sound.play();

    handleActionSendSignal({ action: 'play', roomName: roomName || 'pomodee' });
  }, [handleActionSendSignal, roomName]);

  useEffect(() => {
    if (isSignedIn && signalType === 'pause') {
      pause();
    }

    if (isSignedIn && signalType === 'play') {
      play();
    }

    if (isSignedIn && signalType === 'stop') {
      close();
    }

    if (isSignedIn && signalType === 'reset') {
      reset();
    }
  }, [close, isSignedIn, pause, play, reset, signalType]);

  useEffect(() => {
    const remainingTime = countDown.time || 25;
    setTime(`${Math.floor(remainingTime / 60)} : ${remainingTime % 60}`);
  }, [countDown.time]);

  const CountDown = () => {
    return time;
  };

  const antIcon = <LoadingOutlined style={{ color: '#F34506', fontSize: 24 }} spin />;
  return (
    <Container className='xs:mt-12 md:mt-0' isSignedIn={isSignedIn}>
      {loading ? (
        <LoaderPageStyle>
          <Spin indicator={antIcon} />
        </LoaderPageStyle>
      ) : (
        <>
          <>
            {isSignedIn && (
              <div
                style={{
                  background: '#BF8033',
                  height: 60,
                  width: 60,
                  textAlign: 'center',
                  borderRadius: 50,
                  lineHeight: 1.2,
                  fontSize: 50,
                  fontWeight: 'bold',
                  transform: 'translate(100px, 15px)',
                  color: '#fff'
                }}
              >
                {countDown.cycle || 0}
              </div>
            )}
            <Progress
              strokeColor={
                isSignedIn
                  ? {
                      '0%': '#3928B1',
                      '100%': '#F34506'
                    }
                  : '#fff'
              }
              percent={countDown.percent || 100}
              type="circle"
                width={250}
              format={CountDown}
              strokeWidth={10}
            />
          </>
          <div
            className="control-panel mt-10"
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              transform: 'translateX(0.1rem)'
            }}
          >
            <button
              style={{ border: 'none', background: 'transparent', transform: 'translateX(.5rem)' }}
                onClick={reset}
              disabled={!hasControl}
            >
              <BsStopFill color={isSignedIn ? '#F34506' : '#fff'} size={60} className="timer-refresh-button" />
            </button>

            {!countDown.isPlaying ? (
              <button  style={{ border: 'none', background: 'transparent' }} onClick={play} disabled={!hasControl}>
                <BsPlayFill color={isSignedIn ? '#281998' : '#fff'} size={110.5} className="timer-play-button" />
              </button>
            ) : (
              <button style={{ border: 'none', background: 'transparent' }} onClick={pause} disabled={!hasControl}>
                <BsPause color={isSignedIn ? '#281998' : '#fff'} size={110} className="timer-pause-button" />
              </button>
            )}

            {user && (
                <button
                  onClick={close}
                  disabled={!hasControl}
                  type="button"
                  className={cx("text-white bg-gradient-to-r  hover:bg-gradient-to-br font-medium rounded-full text-sm px-3 py-2.5 text-center mr-2 mb-2",hasControl ? 'from-red-400 via-red-500 to-red-600' : 'from-gray-200 via-gray-300 to-gray-400')}>Close Room</button>
              )}
              
            
          </div>
        </>
      )}
    </Container>
  );
};

export default PomodeeTimer;
