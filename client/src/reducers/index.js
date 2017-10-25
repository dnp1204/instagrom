import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducers from './userReducers';

export default combineReducers({
  form: formReducer,
  user: userReducers
});