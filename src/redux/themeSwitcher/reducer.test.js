import { Map } from 'immutable';
import reducer from './reducer';
import actions from './actions';

let state;

beforeEach(() => {
  state = new Map({
    isActivated: false,
    topbarTheme: {},
  });
});

test('SWITCH_ACTIVATION', () => {
  const nextState = reducer(state, actions.switchActivation());
  expect(nextState.get('isActivated')).toBe(true);
});

test('CHANGE_THEME', () => {
  const nextState = reducer(state, actions.changeTheme('topbarTheme', 'theme1'));
  const topbarTheme1 = {
    backgroundColor: "#e0364c",
    buttonColor: "#e0364c",
    textColor: "#ffffff",
    themeName: "theme1",
  };

  expect(nextState.get('topbarTheme')).toEqual(topbarTheme1);
});