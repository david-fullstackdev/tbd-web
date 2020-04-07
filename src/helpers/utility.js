import { Map } from 'immutable';
import 'whatwg-fetch';
import { times } from 'lodash';
import config from 'config'

export function clearAuthData() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('is_admin');
}

export function getAuthFromLocalStorage() {
  try {
    const idToken = localStorage.getItem('id_token');
    const isAdmin = localStorage.getItem('is_admin') === "true";
    return new Map({ idToken, isAdmin });
  } catch (err) {
    clearAuthData();
    return new Map();
  }
}

export function getCategoryFromLocalStorage() {
  try {
    const active = parseInt(localStorage.getItem('category_id'), 10);
    return new Map({ active });
  } catch(err) {
    localStorage.removeItem('category_id');
    return new Map();
  }
}

export function getDateRange(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const diff = endTime - startTime;
  const range = [];
  const dayMs = 3600 * 24 * 1000;

  times(diff / dayMs, () => {
    const day = range.length + 1;
    const time = startTime + (dayMs * day);
    range.push(time);
  });

  return [startTime].concat(range);
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => num > 9 ? '' + num : '0' + num;
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const text = await response.text();
    const error = new Error(text || response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export function apiRequest(url, data, method = 'GET') {
  const baseUrl = 'http://'+config.apiUrl+':8080';
  const token = localStorage.getItem('id_token');
  const request = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) request.headers['Authorization'] = `Bearer ${token}`;

  return fetch(`${baseUrl}${url}`, request)
    .then(checkStatus)
    .then(parseJSON);
}