const categoriesActions = {
  ADMIN_USER_CATEGORIES_LIST_REQUEST: 'ADMIN_USER_CATEGORIES_LIST_REQUEST',
  ADMIN_USER_CATEGORIES_LIST_SUCCESS: 'ADMIN_USER_CATEGORIES_LIST_SUCCESS',
  ADMIN_USER_CATEGORIES_LIST_ERROR: 'ADMIN_USER_CATEGORIES_LIST_ERROR',
  ADMIN_USER_CATEGORIES_UPDATE_REQUEST: 'ADMIN_USER_CATEGORIES_UPDATE_REQUEST',
  ADMIN_USER_CATEGORIES_UPDATE_SUCCESS: 'ADMIN_USER_CATEGORIES_UPDATE_SUCCESS',
  ADMIN_USER_CATEGORIES_UPDATE_ERROR: 'ADMIN_USER_CATEGORIES_UPDATE_ERROR',
  fetchList: () => ({
    type: categoriesActions.ADMIN_USER_CATEGORIES_LIST_REQUEST,
  }),
};
export default categoriesActions;
