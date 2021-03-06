import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducers from './userReducers';
import postReducers from './postReducers';
import searchReducers from './searchReducers';
import followingReducers from './followingReducers';
import selectPostReducers from './selectPostReducers';

export default combineReducers({
  form: formReducer,
  user: userReducers,
  posts: postReducers,
  searchUser: searchReducers,
  following: followingReducers,
  selectPost: selectPostReducers
});