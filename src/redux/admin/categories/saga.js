import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchAll, create, update, remove } from 'api/category';
import actions from './actions';

// TODO refactor

export function* fetchCategories() {
  yield takeEvery(actions.ADMIN_CATEGORIES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchAll);

      yield put({
        type: actions.ADMIN_CATEGORIES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.ADMIN_CATEGORIES_LIST_ERROR });
    }
  });
}

export function* createCategory() {
  yield takeEvery(actions.ADMIN_CREATE_CATEGORY_REQUEST, function* (action) {
    try {
      const result = yield call(create, action.payload);

      yield put({
        type: actions.ADMIN_CREATE_CATEGORY_SUCCESS,
        payload: result,
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_CREATE_CATEGORY_ERROR });
    }
  });
}

export function* updateCategory() {
  yield takeEvery(actions.ADMIN_UPDATE_CATEGORY_REQUEST, function* (action) {
    try {
      const result = yield call(update, action.payload);

      yield put({
        type: actions.ADMIN_UPDATE_CATEGORY_SUCCESS,
        payload: result,
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_UPDATE_CATEGORY_ERROR });
    }
  });
}

export function* deleteCategory() {
  yield takeEvery(actions.ADMIN_DELETE_CATEGORY_REQUEST, function* (action) {
    try {
      const result = yield call(remove, action.payload);

      yield put({
        type: actions.ADMIN_DELETE_CATEGORY_SUCCESS,
        payload: result.id,
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_DELETE_CATEGORY_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchCategories),
    fork(createCategory),
    fork(updateCategory),
    fork(deleteCategory),
  ]);
}
