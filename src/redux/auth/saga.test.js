import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import { loginRequest } from './saga';
import actions from './actions';
import * as api from '../../api/user';

const user = {
  token: 'token',
  first_name: 'Test',
  last_name: 'Test',
  admin: false,
};

const credentials = {
  email: 'test@test.com',
  password: 'test',
};

test('loginSaga', () => {
  return expectSaga(loginRequest)
    .provide([
      [matchers.call.fn(api.login), user],
    ])
    .put({
      type: actions.LOGIN_SUCCESS,
      token: 'token',
      isAdmin: false,
      profile: 'Test Test'
    })
    .put(push('/dashboard/home'))
    .dispatch(actions.login(credentials))
    .run();
});

test('loginSaga handles error', () => {
  const err = new Error('Error');
  return expectSaga(loginRequest)
    .provide([
      [matchers.call.fn(api.login), throwError(err)],
    ])
    .put({
      type: actions.LOGIN_ERROR,
      error: 'Error',
    })
    .dispatch(actions.login({}))
    .run();
});