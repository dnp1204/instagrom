import { MAKE_POST, FETCH_POSTS } from '../actions/types';

const initialState = {
  posts: [{ likes: [], comments: [], image: '' }],
  followers: [],
  following: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case MAKE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state
  }
}