import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { notification } from 'antd';
import useLocalstorage from '../../hooks/useLocalstorage';
import { googleSignin } from '../../services/auth.services';

const StyledButton = styled.button`
  background: white;
  display: flex;
  height: 48px;
  width: 48%;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-size: 1.1rem;
  color: #3928B1;

  svg {
    margin-left: 15px
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

function SocialAuthButtons({authSuccess}) {
  const { handleSetLocalStorage } = useLocalstorage();

  const SigninGoogle = async (e) => {
    e.preventDefault();
    try {
      const user = await googleSignin();

      notification.open({
        message: 'Authentication',
        description: 'Login successfull',
        style: {
          backgroundColor: '#4BB543',
          color: 'white'
        }
      });

      handleSetLocalStorage('userInfo', user.accessToken);
      authSuccess()
    } catch (error) {
      notification.open({
        message: 'Authenticator Error',
        description: `${error.message.slice(10)}`,
        style: {
          backgroundColor: '#ff0033',
          color: 'white'
        }
      });
      console.log(error);
    } finally {
    }
  }
  return (
    <ButtonsContainer>
      <StyledButton onClick={(e) => SigninGoogle(e)}>
        Google
        <FcGoogle size={25} className="auth-icon" />
      </StyledButton>
      <StyledButton>
        Facebook
        <FaFacebookF size={25} className="auth-icon" color='#4267B2' />
      </StyledButton>
    </ButtonsContainer>
  )
}

export default SocialAuthButtons