import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchUsersModules, saveUserModules } from 'api/users';
import userActions from 'redux/admin/users/actions';
import actions from './actions';

export function* fetchModules() {
  yield takeEvery(actions.ADMIN_USER_MODULES_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchUsersModules);

      yield put({
        type: actions.ADMIN_USER_MODULES_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.ADMIN_USER_MODULES_LIST_ERROR });
    }
  });
}

export function* saveModules(action) {
  try {
    const { id } = action.payload;
    const { modules } = action.references;
    const result = yield call(saveUserModules, id, modules);

    yield put({
      type: actions.ADMIN_USER_MODULES_UPDATE_SUCCESS,
      payload: result,
      userId: id,
    });
  } catch (e) {
    yield put({ type: actions.ADMIN_USER_MODULES_UPDATE_ERROR });
  }
}

export function* createModules() {
  yield takeEvery(userActions.ADMIN_CREATE_USER_SUCCESS, saveModules)
}

export function* updateModules() {
  yield takeEvery(userActions.ADMIN_UPDATE_USER_SUCCESS, saveModules)
}

export default function* rootSaga() {
  yield all([
    fork(fetchModules),
    fork(createModules),
    fork(updateModules),
  ]);
}
