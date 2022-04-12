import axios from 'axios';
import { baseUrl } from './auth.services';

export const getFriendsList = async (params) => {
  try {
    const user = await axios.get(`${baseUrl}/friend/${params}`, params).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('getFriendsList', error);
  }
};

export const searchFriends = async (params) => {
  try {
    const user = await axios.get(`${baseUrl}/friend/search?user=${params}`, params).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('searchFriends', error);
  }
};

export const singleUser = async (id) => {
  try {
    const user = await axios.get(`${baseUrl}/friend/user/${id}`).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('searchFriends', error);
  }
};

export const unFriendUser = async (params) => {
  try {
    const user = await axios.post(`${baseUrl}/friend/unfriend`, params).then((res) => res.data);
    return user;
  } catch (error) {
    console.log('unFriendUser', error);
  }
};
