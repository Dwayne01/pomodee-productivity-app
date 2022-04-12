import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Scrollbars from 'react-custom-scrollbars';
import axios from 'axios';
import './styles.css';

function Ranking() {
  const [userData, setUserData] = useState([]);

  const getUserInfo = () => {
    axios
      .get('https://pomodee-server.herokuapp.com/api/v1/auth/hallOfFame')

      .then((result) => {
        setUserData(Object.values(result.data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Scrollbars className="scrollbar">
      <div className="rankingSection">
        {userData.map((item, index) => {
          return index < 10 ? <ProgressBar item={item} index={index} /> : undefined;
        })}
      </div>
    </Scrollbars>
  );
}

export default Ranking;
