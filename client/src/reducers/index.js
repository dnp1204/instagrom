import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import pollReducers from './pollReducers';

export default combineReducers({
  form: formReducer
});