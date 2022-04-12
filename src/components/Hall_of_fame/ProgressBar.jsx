import React from 'react';
import AvatarImg from '../AvatarImg';

const barStyles = {
  height: 37,
  width: 225,
  backgroundColor: '#F4F4F4',
  borderRadius: 50,
  marginTop: 20,
  marginBottom: 10,
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
};

const fillerStyles = {
  height: '100%',
  width: '23%',
  backgroundColor: '#3928B1',
  borderRadius: 'inherit',
  textAlign: 'center',
  position: 'absolute',
  left: '90%'
};

const scoreStyles = {
  padding: 20,
  color: 'white',
  fontSize: 20,
  fontWeight: 400
};

function ProgressBar({ item, index }) {

  return (
    <span className="ranking" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="rankingNum" style={{ marginRight: '.5rem' }}>{`${index + 1}`}</div>
      <AvatarImg
        alt="userPic"
        className="userImg"
        style={{ borderRadius: 50 }}
        height={60}
        width={60}
        size={4}
        avatarId={item.avatar || 1}
      />

      <div className="bgBar" style={barStyles}>
        <div className="userName">&nbsp;&nbsp;&nbsp;{item.username}</div>
        <div className="scoreBar" style={fillerStyles}>
          <span style={scoreStyles}>{item.cycles}</span>
        </div>
      </div>
    </span>
  );
}

export default ProgressBar;
