import React, { useState } from 'react';
import styled from 'styled-components';
import { notification, Spin } from 'antd';
import Button from 'react-bootstrap/Button';
import { signup } from '../../services/auth.services';
import SocialAuthButtons from '../../components/socialAuthButtons';

const InputBox = styled.div`
  input {
    border: none;
    border-bottom: 1px solid white;
    margin-bottom: 40px;
    width: 400px;
    background-color: transparent;
    color: white;
    &::placeholder {
      color: #d1d1d1;
    }
  }
`;

const SignUp = ({ toggleSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
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
    setIsLoading(false);

    const userData = {
      username: values.username,
      email: values.email,
      password: values.password
    };

    try {
      await signup(userData);

      toggleSignUp();
      notification.open({
        message: 'Authentication',
        description: 'Registration completed successfully',
        style: {
          backgroundColor: '#4BB543',
          color: 'white'
        }
      });
    } catch (error) {
      notification.open({
        message: 'Authentication Error',
        description: `${error.message.slice(10)}`,
        style: {
          backgroundColor: '#ff0033',
          color: 'white'
        }
      });
      console.log(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form style={{ margin: 50 }} onSubmit={handleSubmit}>
      <InputBox>
        <input
          type="text"
          name="username"
          required
          className="form-control-lg"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          data-testid="register-form-username"
        />{' '}
        <br />
        <input
          type="email"
          name="email"
          required
          className="form-control-lg"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          data-testid="register-form-email"
        />{' '}
        <br />
        <input
          type="password"
          name="password"
          className="form-control-lg"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
          data-testid="register-form-password"
        />{' '}
      </InputBox>

      <Button
        variant="primary"
        size="lg"
        type="submit"
        disabled={isLoading}
        style={{
          width: '300px',
          backgroundColor: '#fff',
          color: '#3928B1',
          borderRadius: '50px',
          margin: '20px 50px'
        }}
        data-testid="register-form-btn"
      >
        {isLoading && <Spin style={{ color: '#3928B1' }} />} Sign Up
      </Button>

      <SocialAuthButtons authSuccess={() => toggleSignUp()} />

      <p className="text-right" style={{ marginLeft: '100px', color: 'white', marginTop: '10px' }}>
        Already have an account?
        <strong style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 5 }} onClick={toggleSignUp}>
          Login
        </strong>
      </p>
    </form>
  );
};

export default SignUp;
