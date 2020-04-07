import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchUsersCategories, saveUserCategories } from 'api/users';
import actions from './actions';
import userActions from 'redux/admin/users/actions';

export function* fetchCategories() {
  yield takeEvery(actions.ADMIN_USER_CATEGORIES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchUsersCategories);

      yield put({
        type: actions.ADMIN_USER_CATEGORIES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.ADMIN_USER_CATEGORIES_LIST_ERROR });
    }
  });
}

export function* saveModules(action) {
  try {
    const { id } = action.payload;
    const { categories } = action.references;
    const result = yield call(saveUserCategories, id, categories);

    yield put({
      type: actions.ADMIN_USER_CATEGORIES_UPDATE_SUCCESS,
      payload: result,
      userId: id,
    });
  } catch (e) {
    yield put({ type: actions.ADMIN_USER_CATEGORIES_UPDATE_ERROR });
  }
}

export function* createCategories() {
  yield takeEvery(userActions.ADMIN_CREATE_USER_SUCCESS, saveModules)
}

export function* updateCategories() {
  yield takeEvery(userActions.ADMIN_UPDATE_USER_SUCCESS, saveModules)
}

export default function* rootSaga() {
  yield all([
    fork(fetchCategories),
    fork(createCategories),
    fork(updateCategories),
  ]);
}
