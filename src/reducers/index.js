import { combineReducers } from 'redux';
import users from './users';
import homeScreen from './homeScreen';
import details from './details';
import category from './category';

export default combineReducers({
  users,
  homeScreen,
  details,
  category
})
