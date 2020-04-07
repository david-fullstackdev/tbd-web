import { combineReducers } from 'redux';
import Categories from './categories/reducer';
import Modules from './modules/reducer';
import Users from './users/reducer';
import UsersModules from './users_modules/reducer';
import UsersCategories from './users_categories/reducer';

export default combineReducers({
  Categories,
  Modules,
  Users,
  UsersModules,
  UsersCategories,
})