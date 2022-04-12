import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { login } from '../../services/auth.services';
import { notification, Spin } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import useLocalstorage from '../../hooks/useLocalstorage';

const InputBox = styled.div`
  input {
    border: none;
    border-bottom: 1px solid white;
    margin-bottom: 40px;
    width: 100%;
    background-color: transparent;
    color: white;
    &::placeholder {
      color: #d1d1d1;
    }
  }
`;

function SignIn({ toggleSignIn }) {
  const [isLoading, setIsLoading, setIsAuth] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetLocalStorage } = useLocalstorage();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsLoading(true);
    const userData = {
      email: values.email,
      password: values.password
    };

    try {
      const user = await login(userData);

      if (user) {
        notification.open({
          message: 'Authentication',
          description: 'Login successfull',
          style: {
            backgroundColor: '#4BB543',
            color: 'white'
          }
        });

        handleSetLocalStorage('userInfo', user.user._id);
        setIsSignedIn(true);
        setIsAuth(false);
      }
    } catch (error) {
      notification.open({
        message: 'Authenticator Error',
        description: error,
        style: {
          backgroundColor: '#ff0033',
          color: 'white'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form style={{ margin: 50 }}>
      <InputBox>
        <input
          type="email"
          className="form-control-lg"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="form-control-lg"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </InputBox>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          width: '300px',
          backgroundColor: '#fff',
          color: '#3928B1',
          borderRadius: '50px',
          margin: '20px 50px'
        }}
      >
        {isLoading && <Spin style={{ color: '#3928B1' }} />} Login
      </Button>

      <p className="text-right" style={{ marginLeft: '100px', color: '#fff', marginTop: '10px' }}>
        Don't have an account?{' '}
        <strong style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleSignIn}>
          Register
        </strong>
      </p>
    </form>
  );
}

export default SignIn;
