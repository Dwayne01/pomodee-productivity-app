import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useSocketIo from './useSocketIo';

const useLogout = (setUser, user) => {
  const { setUserToContext, setIsSignedIn } = useContext(AuthContext);
  const { sendSignal } = useSocketIo();

  const logout = () => {
    let roomName = user ? user.username : 'pomodee';
    localStorage.clear();
    setUserToContext(null);
    setIsSignedIn(false);
    setUser(null);

    setTimeout(() => {
      sendSignal('logout', { roomName });
      window.location.href = '/';
    }, 3000);
  };
  return {
    logout
  };
};

export default useLogout;
