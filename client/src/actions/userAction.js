import axios from 'axios';
import { FETCH_CURRENT_USER } from './types';

const URL = '/api';

export const fetchCurrentUser = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/current_user`);
    dispatch({ type: FETCH_CURRENT_USER, payload: request.data });
  } catch (err) {
    console.log(err);
  }
};
