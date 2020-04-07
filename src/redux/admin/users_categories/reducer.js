import { Map, List } from 'immutable';
import actions from './actions';

const initState = new Map({
  loading: false,
  list: new List(),
});

export default function modulesReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADMIN_USER_CATEGORIES_LIST_REQUEST:
      return state.set('loading', true);
    case actions.ADMIN_USER_CATEGORIES_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('list', new List(action.payload));
    case actions.ADMIN_USER_CATEGORIES_UPDATE_SUCCESS:
      return state.set('list', state
        .get('list')
        .filter(item => item.user_id !== action.userId)
        .concat(action.payload));
    default:
      return state;
  }
}
