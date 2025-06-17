import axios from 'axios';

const URL =import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3002";

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Common methods
export const get = (url, config = {}) => api.get(url, config);

export const post = (url, data, headers = {}) =>
  api.post(url, data, { headers });

// Add a put method for updating
export const put = (url, data, headers = {}) =>
  api.put(url, data, { headers });