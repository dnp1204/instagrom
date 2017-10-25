import { FETCH_CURRENT_USER } from '../actions/types';

const initialState = {
  posts: [],
  followers: [],
  following: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}