import { SELECT_POST, LIKE_POST, DELETE_COMMENT, COMMENT_POST } from '../actions/types';

const initialState = { likes: [], comments: [] }

export default function(state = initialState, action) {
  switch (action.type) {
    case COMMENT_POST:
      return { ...state, comments: [...state.comments, action.payload.comment] };
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
