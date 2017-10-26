import { MAKE_POST, FETCH_POSTS, LIKE_POST } from '../actions/types';

const initialState = {
  posts: [{ likes: [], comments: [], image: '' }],
  followers: [],
  following: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIKE_POST:
      return action.payload;
    case FETCH_POSTS:
      return action.payload;
    case MAKE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state
  }
}