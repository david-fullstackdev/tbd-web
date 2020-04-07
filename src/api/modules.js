import { apiRequest } from 'helpers/utility';

export function fetchAll() {
  return apiRequest('/modules');
}