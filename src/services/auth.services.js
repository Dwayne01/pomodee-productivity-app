import axios from 'axios';
import {auth} from '../util/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api/v1'
    : 'https://pomodee-server.herokuapp.com/api/v1';

export const login = async (params) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signup = async (params) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const googleSignin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const userCredential = GoogleAuthProvider.credentialFromResult(res);

    return res.user;
  } catch (error) {
    throw error;
  }
};

export const facebookSignin = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(res);
    const accessToken = credential.accessToken;

    return user;
  } catch (error) {
    throw error;
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
