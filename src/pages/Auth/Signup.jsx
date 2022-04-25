import React, { useState } from 'react';
import styled from 'styled-components';
import { notification, Spin } from 'antd';
import Button from 'react-bootstrap/Button';
import { signup } from '../../services/auth.services';

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
      const user = await signup(userData);

      if (user.message !== 'User already exist') {
        toggleSignUp();
        notification.open({
          message: 'Authentication',
          description: 'Registration completed successfully',
          style: {
            backgroundColor: '#4BB543',
            color: 'white'
          }
        });
      } else {
        notification.open({
          message: 'Authentication Error',
          description: 'User already exist',
          style: {
            backgroundColor: '#ff0033',
            color: 'white'
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='text-center md:w-96 mx-16'  onSubmit={handleSubmit}>
      <InputBox>
        <input
          type="text"
          name="username"
          required
          className="form-control-lg"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
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
        />{' '}
      </InputBox>

      <Button
        variant="primary"
        size="lg"
        type="submit"
        className='w-40 mb-10 rounded-full bg-white text-pomodee-purple-100 '
        disabled={isLoading}
      >
        {isLoading && <Spin style={{ color: '#3928B1' }} />} Sign Up
      </Button>

      <p className="text-center text-white">
        Already have an account?
        <strong style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 5 }} onClick={() => toggleSignUp("register")}>
          Login
        </strong>
      </p>
    </form>
  );
};

export default SignUp;
