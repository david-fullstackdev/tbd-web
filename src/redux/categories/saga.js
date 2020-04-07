import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchCategories } from 'api/user';
import actions from './actions';

export function* fetchCategoriesRequest() {
  yield takeEvery(actions.CATEGORIES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchCategories);

      yield put({
        type: actions.CATEGORIES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.CATEGORIES_LIST_ERROR });
    }
  });
}

export function* selectCategory () {
  yield takeEvery(actions.SELECT_CATEGORY, function* (action) {
    yield localStorage.setItem('category_id', action.payload);
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchCategoriesRequest),
  ]);
}
