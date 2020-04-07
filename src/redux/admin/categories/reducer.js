import { Map, List } from 'immutable';
import actions from './actions';

const initState = new Map({
  loading: false,
  progress: false,
  list: new List(),
});

export default function categoriesReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADMIN_CATEGORIES_LIST_REQUEST:
      return state.set('loading', true);
    case actions.ADMIN_CATEGORIES_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('list', new List(action.payload));
    case actions.ADMIN_CREATE_CATEGORY_REQUEST:
    case actions.ADMIN_UPDATE_CATEGORY_REQUEST:
      return state.set('progress', true);
    case actions.ADMIN_CREATE_CATEGORY_ERROR:
    case actions.ADMIN_UPDATE_CATEGORY_ERROR:
      return state.set('progress', false);
    case actions.ADMIN_CREATE_CATEGORY_SUCCESS:
      return state
        .set('list', state.get('list').push(action.payload))
        .set('progress', false);
    case actions.ADMIN_UPDATE_CATEGORY_SUCCESS:
      const list1 = state.get('list');
      const index1 = list1.findIndex(i => i.id === action.payload.id);
      return state
        .set('list', list1.update(index1, (val) => Object.assign({}, val, action.payload)))
        .set('progress', false);
    case actions.ADMIN_DELETE_CATEGORY_SUCCESS:
      const list2 = state.get('list');
      const index2 = list2.findIndex(i => i.id === action.payload);
      return state.set('list', list2.remove(index2));
    default:
      return state;
  }
}
