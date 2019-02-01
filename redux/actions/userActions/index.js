import axios from 'axios';
import { asyncTypes } from '../../types';

const { apiUrl } = process.env;

export function postSignUpAction(payload) {
  return {
    type: asyncTypes.POST_SIGNUP,
    payload,
  };
}

export function postLoginAction(payload) {
  return {
    type: asyncTypes.POST_LOGIN,
    payload,
  };
}

export function postIsTokenValidAction(payload) {
  return {
    type: asyncTypes.POST_TOKEN_IS_VALID,
    payload,
  };
}

export function postResetPasswordAction(payload) {
  return {
    type: asyncTypes.POST_RESET_PASSWORD,
    payload,
  };
}

export function postSignUp(user) {
  const endPoint = `${apiUrl}users/signup`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, user);
      dispatch(postSignUpAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postLogin(user) {
  const endPoint = `${apiUrl}users/login`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, user);
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postLoginAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postResetPassword(email) {
  const endPoint = `${apiUrl}users/reset-password`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, { email });
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postResetPasswordAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postIsTokenValid(token) {
  const endPoint = `${apiUrl}users/token`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, { token });
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postIsTokenValidAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}
