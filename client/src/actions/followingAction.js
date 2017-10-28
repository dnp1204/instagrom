import axios from 'axios';
import { FETCH_FOLLOWING, LIKE_FOLLOWING_POST, COMMENT_FOLLOWING_POST } from './types';

const URL = '/api/following';
const URL_POST = '/api/post';

export const fetchFollowing = () => async dispatch => {
  try {
    const request = await axios.get(URL);
    dispatch({ type: FETCH_FOLLOWING, payload: request.data });
  } catch (err) {
    console.log(err);
  }
};

export const likeFollowingPost = (postId, userId, userName, userAvatar) => async dispatch => {
  try {
    const request = await axios.put(`${URL_POST}/${postId}/like`);
    const post = request.data.post;
    post.userId = userId;
    post.userName = userName;
    post.userAvatar = userAvatar
    dispatch({ type: LIKE_FOLLOWING_POST, payload: post });
  } catch (err) {
    console.log(err);
  }
};

export const commentFollowingPost = (content, postId, userId, userName, userAvatar) => async dispatch => {
  try {
    const request = await axios.put(`${URL_POST}/${postId}/comment`, { content });
    dispatch({ type: COMMENT_FOLLOWING_POST, payload: request.data });
  } catch (err) {
    console.log(err);
  }
}
