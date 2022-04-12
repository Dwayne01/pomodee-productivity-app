import React from 'react';

export const AvatarDictionary = {
  1: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/1.svg?alt=media&token=09bd510f-e383-46c9-b6d9-ac448afb02c7',
  2: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/2.svg?alt=media&token=74ba50a5-3997-4e28-9fe2-3748c7f702de',
  3: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/3.svg?alt=media&token=1477d2b1-a15c-47e2-89a9-e1fd05ab588b',
  4: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/4.svg?alt=media&token=b2fffffd-5776-4704-8fd1-e76e24aa7947',
  5: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/5.svg?alt=media&token=d0662261-aefc-49ce-acaa-0e518fcd043f',
  6: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/6.svg?alt=media&token=be87088a-1263-4a45-ba4c-47ede66b09c2',
  7: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/7.svg?alt=media&token=39681603-cbbe-4549-92a9-b3940a2d80d6',
  8: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/8.svg?alt=media&token=c69cdddc-dca6-41c1-b804-6a4015b973f2',
  9: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/9.svg?alt=media&token=a3af2ad1-8e2c-4925-8d25-b08beca81ee6'
};
const AvatarImg = ({ avatarId, alt, ...otherProps }) => {
  return <img alt="avatar" {...otherProps} src={AvatarDictionary[avatarId]} />;
};

export default AvatarImg;
