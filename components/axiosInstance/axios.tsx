// src/lib/axios.js
import axios from 'axios';

// Public Axios instance (no auth)
export const publicAxios = axios.create({
  baseURL: "https://notre-batteries-responses-proposals.trycloudflare.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});


// Private Axios instance (with auth)
export const privateAxios = axios.create({
  baseURL: "https://notre-batteries-responses-proposals.trycloudflare.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to attach auth token to privateAxios requests
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);