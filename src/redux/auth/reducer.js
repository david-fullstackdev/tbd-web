import { Map } from 'immutable';
import { getAuthFromLocalStorage } from 'helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: null
});

export default function authReducer(
  state = initState.merge(getAuthFromLocalStorage()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return state
        .set('error', null)
        .set('loading', true);
    case actions.LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('idToken', action.token)
        .set('isAdmin', action.isAdmin);
    case actions.LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
