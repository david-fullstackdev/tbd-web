import { apiRequest } from 'helpers/utility';

export function fetchAll() {
  return apiRequest('/users');
}

export function create(data) {
  return apiRequest('/user/signup', data, 'POST');
}

export function update(data) {
  return apiRequest('/user', data, 'PUT');
}

export function remove(id) {
  return apiRequest('/user', { id }, 'DELETE');
}

export function fetchUsersCategories() {
  return apiRequest('/users/categories');
}

export function saveUserCategories(userId, categories) {
  return apiRequest('/users/categories', { userId, categories }, 'POST');
}

export function fetchUsersModules() {
  return apiRequest('/users/modules');
}

export function saveUserModules(userId, modules) {
  return apiRequest('/users/modules', { userId, modules }, 'POST');
}