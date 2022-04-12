import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;

  @media screen and (min-width: 800px) {
    transform: translateY(100px);
  }
`;

const Footer = ({ isSignedIn }) => {
  return (
    <Container>
      <p className="copyright text-xl" style={{ color: isSignedIn ? '#000' : '#fff' }}>
        {new Date().getFullYear()} © Array[6]. All Rights Reserved.
      </p>
      
    </Container>
  );
};

export default Footer;
