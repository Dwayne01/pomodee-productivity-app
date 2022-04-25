import React from 'react';


const Footer = ({ isSignedIn }) => {
  return (
    <div className='text-center'>
      <p className="copyright text-xl" style={{ color: isSignedIn ? '#000' : '#fff' }}>
        {new Date().getFullYear()} © Innovative Software. All Rights Reserved.
      </p>
      
    </div>
  );
};

export default Footer;
