import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { fetchAll, create, update, remove } from 'api/users';
import actions from './actions';

// TODO refactor

export function* fetchUsers() {
  yield takeEvery(actions.ADMIN_USERS_LIST_REQUEST, function*() {
    try {
      const result = yield call(fetchAll);

      yield put({
        type: actions.ADMIN_USERS_LIST_SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({ type: actions.ADMIN_USERS_LIST_ERROR });
    }
  });
}

export function* createUser() {
  yield takeEvery(actions.ADMIN_CREATE_USER_REQUEST, function* (action) {
    try {
      const { modules, categories, ...userData } = action.payload;
      const result = yield call(create, userData);

      yield put({
        type: actions.ADMIN_CREATE_USER_SUCCESS,
        payload: result,
        references: { modules, categories },
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_CREATE_USER_ERROR });
    }
  });
}

export function* updateUser() {
  yield takeEvery(actions.ADMIN_UPDATE_USER_REQUEST, function* (action) {
    try {
      const { modules, categories, ...userData } = action.payload;
      const result = yield call(update, userData);

      yield put({
        type: actions.ADMIN_UPDATE_USER_SUCCESS,
        payload: result,
        references: { modules, categories },
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_UPDATE_USER_ERROR });
    }
  });
}

export function* deleteUser() {
  yield takeEvery(actions.ADMIN_DELETE_USER_REQUEST, function* (action) {
    try {
      const result = yield call(remove, action.payload);

      yield put({
        type: actions.ADMIN_DELETE_USER_SUCCESS,
        payload: result.id,
      });
    } catch(e) {
      yield put({ type: actions.ADMIN_DELETE_USER_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchUsers),
    fork(createUser),
    fork(updateUser),
    fork(deleteUser),
  ]);
}
