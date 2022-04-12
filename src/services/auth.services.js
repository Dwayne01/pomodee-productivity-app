import axios from 'axios';

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api/v1'
    : 'https://pomodee-server.herokuapp.com/api/v1';

export const login = async (params) => {
  try {
    const user = await axios.post(`${baseUrl}/auth/login`, params).then((res) => res.data);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signup = async (params) => {
  try {
    const user = await axios.post(`${baseUrl}/auth/register`, params).then((res) => res.data);

    return user;
  } catch (error) {
    return error;
  }
};

export const updateAvatar = async (params) => {
  console.log(params);
  try {
    const user = await axios.put(`${baseUrl}/auth/updateAvatar`, params).then((res) => res.data);

    return user;
  } catch (error) {
    return error;
  }
};

export const addCycle = (cycleData) => {
  axios.put(`${baseUrl}/auth/addCycle`, cycleData).then((res) => res.data);
};

export const saveCycles = (val) => {
  axios.put(`${baseUrl}/auth/updateUser`, val).then((res) => res.data);
};
