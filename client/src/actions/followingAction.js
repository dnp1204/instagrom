import axios from 'axios';
import { FETCH_FOLLOWING } from './types';

const URL = '/api/following';

export const fetchFollowing = () => async dispatch => {
  try {
    const request = await axios.get(URL);
    dispatch({ type: FETCH_FOLLOWING, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}