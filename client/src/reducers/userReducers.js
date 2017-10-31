import { FETCH_CURRENT_USER , FOLLOWING_USER, FOLLOWING_USER_FROM_LIST} from '../actions/types';

const initialState = {
  posts: [{ _id: '', likes: [], comments: [], image: '' }],
  followers: [],
  following: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_USER_FROM_LIST:
      return { ...state, following: action.payload.following };
    case FOLLOWING_USER:
      return { ...state, following: action.payload.following };
    case FETCH_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}