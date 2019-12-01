import axios from 'axios';

import { GET_TASKS, ADD_TASK, DELETE_TASK } from './types';
import { backEndUrl } from '../../utilities/api';

export const getTasks = (filter) => (dispatch, getState) => {
  let url = `${backEndUrl}/tasks`;
  if (filter) {
    url = url.concat(`/${filter}`);
  }
  const config = tokenConfig(getState);
  axios.get(url, config)
    .then(res => {
      console.log(res); dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    }

    )
}

export const addTask = task => (dispatch, getState) => {
  let url = `${backEndUrl}/tasks`;
  const body = JSON.stringify(task);
  axios
    .post(url, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
    )
}

export const deleteTask = id => (dispatch, getState) => {
  let url = `${backEndUrl}/tasks`;
  axios
    .delete(`${url}/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
}


export const tokenConfig = getState => {
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}
