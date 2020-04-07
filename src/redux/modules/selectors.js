import { createSelector } from 'reselect';

const getModules = state => state.Modules;
const getModulesList = createSelector(getModules, modules => modules.get('list'));
const getModuleIdFromMatch = (state, props) => props.match.params.module;

export const getActiveModule = createSelector(
  getModulesList,
  getModuleIdFromMatch,
  (modules, id) => {
    console.log(modules.toArray(), id);
    return modules.find(item => item.module === id);
  }
);