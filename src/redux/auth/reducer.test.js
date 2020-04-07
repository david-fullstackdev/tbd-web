import { Map } from 'immutable';
import reducer from './reducer';
import actions from './actions';

const defaultState = { idToken: null };
const state = new Map(defaultState);

test('default', () => {
  const nextState = reducer(state, {});
  expect(nextState.toJSON()).toEqual(defaultState);
});

test('LOGIN_REQUEST', () => {
  const credentials = { email: 'test@test.com', password: 'test' };
  const nextState = reducer(state, { type: actions.LOGIN_REQUEST, payload: credentials });

  expect(nextState.toJSON()).toMatchObject({
    error: null,
    loading: true,
  });
});

test('LOGIN_SUCCESS', () => {
  const response = { token: 'testToken', isAdmin: true };
  const nextState = reducer(state, { type: actions.LOGIN_SUCCESS, ...response });
  const stateData = nextState.toJSON();

  expect(stateData.error).toBe(undefined);
  expect(stateData).toMatchObject({
    idToken: response.token,
    isAdmin: true,
    loading: false,
  });
});

test('LOGIN_ERROR', () => {
  const nextState = reducer(state, { type: actions.LOGIN_ERROR, error: 'Error' });

  expect(nextState.toJSON()).toMatchObject({
    error: 'Error',
    loading: false,
  });
});

test('LOGOUT', () => {
  const nextState = reducer(state, { type: actions.LOGOUT });
  expect(nextState.toJSON()).toMatchObject(defaultState);
});