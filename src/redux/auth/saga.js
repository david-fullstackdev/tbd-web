import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearAuthData } from 'helpers/utility';
import actions from './actions';
import * as api from '../../api/user';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(action) {
    try {
      const result = yield call(api.login, action.payload);

      yield put({
        type: actions.LOGIN_SUCCESS,
        token: result.token,
        profile: `${result.first_name} ${result.last_name}`,
        isAdmin: result.admin,
      });
      yield put(push('/dashboard/home'));
    } catch (e) {
      yield put({ type: actions.LOGIN_ERROR, error: e.message });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('is_admin', payload.isAdmin);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearAuthData();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
