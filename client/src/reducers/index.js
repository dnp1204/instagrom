import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducers from './userReducers';
import postReducers from './postReducers';
import searchReducers from './searchReducers';

export default combineReducers({
  form: formReducer,
  user: userReducers,
  posts: postReducers,
  searchUser: searchReducers
});