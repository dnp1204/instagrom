import {
  MAKE_POST,
  FETCH_POSTS,
  LIKE_POST,
  FOLLOWING_USER,
  DELETE_POST,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [{ _id: '', likes: [], comments: [], image: '' }],
  followers: [],
  following: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_COMMENT:
      const newPostList = state.posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
      return { ...state, posts: newPostList };
    case DELETE_POST:
      return action.payload;
    case FOLLOWING_USER:
      return { ...state, followers: action.payload.followers };
    case LIKE_POST:
      return action.payload.user;
    case FETCH_POSTS:
      return action.payload;
    case MAKE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
}
