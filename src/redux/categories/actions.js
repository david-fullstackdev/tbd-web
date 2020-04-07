const categoriesActions = {
  CATEGORIES_LIST_REQUEST: 'CATEGORIES_LIST_REQUEST',
  CATEGORIES_LIST_SUCCESS: 'CATEGORIES_LIST_SUCCESS',
  CATEGORIES_LIST_ERROR: 'CATEGORIES_LIST_ERROR',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  fetchList: () => ({
    type: categoriesActions.CATEGORIES_LIST_REQUEST,
  }),
  selectCategory: (payload) => ({
    type: categoriesActions.SELECT_CATEGORY,
    payload,
  }),
};
export default categoriesActions;
