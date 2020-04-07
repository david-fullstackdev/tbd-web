import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import actions from './actions';
import { fetchModules } from '../../api/user';

export function* fetchModulesRequest() {
  yield takeEvery(actions.MODULES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchModules);

      yield put({
        type: actions.MODULES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.MODULES_LIST_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchModulesRequest),
  ]);
}
