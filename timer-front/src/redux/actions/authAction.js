import axios from 'axios';
import { returnErrors } from './errorAction';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_TASK,
} from '../actions/types';
import { backEndUrl } from '../../utilities/api';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  let url = `${backEndUrl}/auth`;
  const config = tokenConfig(getState);
  axios
    .get(url, config)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const register = ({ username, password }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password });
  let url = `${backEndUrl}/auth/signup`;
  axios.post(url, body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(returnErrors(error.response.data.error, error.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    })
}



export const login = ({ username, password }) => dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password });
  let url = `${backEndUrl}/auth/signin`;
  axios.post(url, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(returnErrors(error.response.data.error, error.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      });
    })
}

export const logout = () => dispatch =>{
  dispatch({
    type:LOGOUT_SUCCESS
  });
  dispatch({
    type: CLEAR_TASK
  });
}

export const tokenConfig = getState => {
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      'Content-type': 'appliation/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}