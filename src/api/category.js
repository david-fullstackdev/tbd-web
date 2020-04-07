import { apiRequest } from 'helpers/utility';

export function fetchAll() {
  return apiRequest('/categories');
}

export function c(data) {
  return apiRequest('/category', data, 'POST');
}

export function update(data) {
  return apiRequest('/category', data, 'PUT');
}

export function remove(id) {
  return apiRequest('/category', { id }, 'DELETE');
}