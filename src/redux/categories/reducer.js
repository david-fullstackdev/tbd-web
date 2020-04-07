import { Map, List } from 'immutable';
import { getCategoryFromLocalStorage } from 'helpers/utility';
import actions from './actions';

const initState = new Map({
  loading: false,
  active: null,
  list: new List(),
}).merge(getCategoryFromLocalStorage());

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.CATEGORIES_LIST_REQUEST:
      return state.set('loading', true);
    case actions.CATEGORIES_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('list', new List(action.payload));
    case actions.SELECT_CATEGORY:
      return state.set('active', action.payload);
    default:
      return state;
  }
}
