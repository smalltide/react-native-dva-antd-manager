import { combineReducers } from 'redux';
import HelloReducer from './HelloReducer';

export default combineReducers({
  hello: HelloReducer
});
