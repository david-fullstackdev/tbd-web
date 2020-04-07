import { createSelector } from 'reselect';

const getCategories = state => state.Categories;
const getCategoriesList = createSelector(getCategories, categories => categories.get('list'));
const getActiveCategoryId = createSelector(getCategories, categories => categories.get('active'));

export const getActiveCategory = createSelector(
  getCategoriesList,
  getActiveCategoryId,
  (categories, id) => categories.find(item => item.id === id)
);