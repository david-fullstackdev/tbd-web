import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchAll } from 'api/modules';
import actions from './actions';

export function* fetchModules() {
  yield takeEvery(actions.ADMIN_MODULES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchAll);

      yield put({
        type: actions.ADMIN_MODULES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.ADMIN_MODULES_LIST_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchModules),
  ]);
}
