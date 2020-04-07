import { Map, List } from 'immutable';
import actions from './actions';

const initState = new Map({
  loading: false,
  list: new List(),
});

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.MODULES_LIST_REQUEST:
      return state.set('loading', true);
    case actions.MODULES_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('list', new List(action.payload));
    default:
      return state;
  }
}
