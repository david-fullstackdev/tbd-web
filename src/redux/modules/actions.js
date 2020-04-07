const modulesActions = {
  MODULES_LIST_REQUEST: 'MODULES_LIST_REQUEST',
  MODULES_LIST_SUCCESS: 'MODULES_LIST_SUCCESS',
  MODULES_LIST_ERROR: 'MODULES_LIST_ERROR',
  fetchList: () => ({
    type: modulesActions.MODULES_LIST_REQUEST,
  }),
};
export default modulesActions;
