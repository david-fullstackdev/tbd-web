import { apiRequest } from 'helpers/utility';

export function login(credentials) {
  return apiRequest('/user/login', credentials, 'POST');
}

export function fetchCategories() {
  return apiRequest('/user/category');
}

export function fetchModules() {
  return apiRequest('/user/module');
}