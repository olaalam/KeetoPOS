import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // default base url
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for Request
api.interceptors.request.use(
  (config) => {
    // Example: get token from local storage
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for Response
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Global error handler
    return Promise.reject(error);
  }
);

export default api;
