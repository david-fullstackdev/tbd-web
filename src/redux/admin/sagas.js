import { all } from 'redux-saga/effects';
import categoriesSagas from './categories/saga';
import modulesSagas from './modules/saga';
import usersSagas from './users/saga';
import usersModulesSagas from './users_modules/saga';
import usersCategoriesSagas from './users_categories/saga';

export default function* rootSaga(getState) {
  yield all([
    categoriesSagas(),
    modulesSagas(),
    usersSagas(),
    usersModulesSagas(),
    usersCategoriesSagas(),
  ]);
}
