import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getUsers = state => state.Admin.Users.get('list').toArray();
const getModules = state => state.Admin.Modules.get('list').toArray();
const getCategories = state => state.Admin.Categories.get('list').toArray();
const getUsersModules = state => state.Admin.UsersModules.get('list').toArray();
const getUsersCategories = state => state.Admin.UsersCategories.get('list').toArray();
const getModulesByUserId = createSelector(getUsersModules, data => groupBy(data, 'user_id'));
const getCategoriesByUserId = createSelector(getUsersCategories, data => groupBy(data, 'user_id'));

export const getUsersData = createSelector(
  getUsers,
  getModulesByUserId,
  (users, modules) => users.map(user =>
    Object.assign({}, user, {
      modules: modules[user.id],
      categories: [],
    }))
);

const getModulesOptions = state => state.Admin.Modules
  .get('list')
  .toArray()
  .map(m => ({
    value: m.module,
    label: m.display_name
  }));

const getCategoriesOptions = state => state.Admin.Categories
  .get('list')
  .toArray()
  .map(m => ({
    value: String(m.id),
    label: m.display_name
  }));

const getUserIdFromProps = (state, props) => props.record.id;

export const getUserReferences = createSelector(
  getUserIdFromProps,
  getModulesByUserId,
  getCategoriesByUserId,
  (userId, modules, categories) => ({
    modules: modules[userId] || [],
    categories: categories[userId] || [],
  })
);

export const getUserReferencesIds = createSelector(
  getUserReferences,
  ({ modules, categories }) => ({
    modules: modules.map(m => m.module),
    categories: categories.map(c => String(c.category_id)),
  })
);

export const getUserReferencesTables = createSelector(
  getUserReferencesIds,
  getModules,
  getCategories,
  (references, modules, categories) => ({
    modules: modules.filter(m => references.modules.includes(m.module)),
    categories: categories.filter(c => references.categories.includes(String(c.id))),
  })
);

export const getUserModal = createSelector(
  getModulesOptions,
  getCategoriesOptions,
  getUserReferencesIds,
  (modules, categories, references) => ({
    modules,
    categories,
    references,
  })
);