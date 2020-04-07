import actions from './actions';

test('switchActivation', () => {
  const expected = { type: actions.SWITCH_ACTIVATION };
  expect(actions.switchActivation()).toEqual(expected);
});

test('changeTheme', () => {
  const attribute = 'topbarTheme';
  const theme = {
    backgroundColor: "#e0364c",
    buttonColor: "#e0364c",
    textColor: "#ffffff",
    themeName: "theme1",
  };
  
  const expected = {
    type: actions.CHANGE_THEME,
    attribute,
    theme,
  };

  expect(actions.changeTheme(attribute, 'theme1')).toEqual(expected);
});