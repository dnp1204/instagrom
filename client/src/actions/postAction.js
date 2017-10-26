import axios from 'axios';
import { MAKE_POST, FETCH_POSTS, LIKE_POST } from './types';

const URL = '/api/post';

export const fetchPosts = () => async dispatch => {
  try {
    const request = await axios.get(URL);
    dispatch({ type: FETCH_POSTS, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}

export const makePost = postParams => async dispatch => {
  try {
    const request = await axios.post(`${URL}/new`, postParams);
    dispatch({ type: MAKE_POST, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}

export const likePost = postId => async dispatch => {
  try {
    const request = await axios.put(`${URL}/${postId}/like`);
    dispatch({ type: LIKE_POST, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}