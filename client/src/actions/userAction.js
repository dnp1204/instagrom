import axios from 'axios';
import {
  FETCH_CURRENT_USER,
  SEARCH_USER,
  FOLLOWING_USER,
  FOLLOWING_USER_FROM_LIST,
  DELETE_AVATAR
} from './types';

const URL = '/api';

export const fetchCurrentUser = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/current_user`);
    dispatch({ type: FETCH_CURRENT_USER, payload: request.data });
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = (userId, key) => async dispatch => {
  try {
    const request = await axios.get(`${URL}/${userId}/${key}`);
    const result = request.data.filter(user => {
      return user._id !== userId;
    });
    dispatch({ type: SEARCH_USER, payload: result });
  } catch (err) {
    console.log(err);
  }
};

export const followUser = userId => async dispatch => {
  try {
    const request = await axios.get(`${URL}/${userId}/following`);
    dispatch({ type: FOLLOWING_USER, payload: request.data });
  } catch (err) {
    console.log(err);
  }
};

export const followUserFromList = (userId, visitedUserId) => async dispatch => {
  try {
    const list = true;
    const request = await axios.get(`${URL}/${userId}/${list}/following`);
    if (visitedUserId) {
      dispatch({
        type: FOLLOWING_USER_FROM_LIST,
        payload: { following: request.data.following }
      });
    } else {
      dispatch({ type: FOLLOWING_USER_FROM_LIST, payload: request.data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteAvatar = userId => async dispatch => {
  try {
    const request = await axios.put(`${URL}/${userId}/deleteAvatar`);
    dispatch({ type: DELETE_AVATAR, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}
