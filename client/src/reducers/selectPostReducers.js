import { SELECT_POST, LIKE_POST, DELETE_COMMENT } from '../actions/types';

const initialState = { likes: [], comments: [] }

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_COMMENT:
      return { ...state, comments: action.payload.comments };
    case LIKE_POST:
      return { ...state, likes: action.payload.post.likes, isLiked: !state.isLiked };
    case SELECT_POST:
      return action.payload;
    default:
      return state;
  }
}
