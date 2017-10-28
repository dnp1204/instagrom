import { MAKE_POST, FETCH_POSTS, LIKE_POST, FOLLOWING_USER } from '../actions/types';

const initialState = {
  posts: [{ _id: '', likes: [], comments: [], image: '' }],
  followers: [],
  following: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_USER:
      return { ...state, followers: action.payload };
    case LIKE_POST:
      return action.payload.user;
    case FETCH_POSTS:
      return action.payload;
    case MAKE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state
  }
}