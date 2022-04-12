import axios from 'axios';
import { baseUrl } from './auth.services';

export const getFriendsRequests = async (params) => {
  try {
    const user = await axios.get(`${baseUrl}/request/${params}`).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('getFriendsRequests', error);
  }
};

export const createRequests = async (params) => {
  try {
    const user = await axios.post(`${baseUrl}/request/create`, params).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('createRequests', error);
  }
};

export const deleteRequest = async (params) => {
  try {
    const user = await axios.delete(`${baseUrl}/request/delete`, params).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('unFriendUser', error);
  }
};

export const acceptFriendRequest = async (params) => {
  try {
    const user = await axios.post(`${baseUrl}/request/acceptFriend`, params).then((res) => res.data.data);
    return user;
  } catch (error) {
    console.log('acceptFriendRequest', error);
  }
};
