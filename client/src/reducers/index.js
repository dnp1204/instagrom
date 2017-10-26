import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducers from './userReducers';
import postReducers from './postReducers';

export default combineReducers({
  form: formReducer,
  user: userReducers,
  posts: postReducers
});