import axios from 'axios';

// API Base URL
// Development: http://localhost:5000
// Production: https://asah-backend.vercel.app
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://asah-backend.vercel.app' : 'http://localhost:5000');

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Login
  login: async (identifier, password) => {
    const response = await api.post('/api/auth/login', {
      identifier,
      password,
    });
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Insights API
export const insightsAPI = {
  // Get current insights
  getCurrentInsights: async (userId) => {
    const response = await api.get(`/api/insights/${userId}`);
    return response.data;
  },

  // Regenerate insights
  regenerateInsights: async (userId, activities) => {
    const response = await api.post(`/api/insights/${userId}/regenerate`, {
      activities,
    });
    return response.data;
  },
};

// Activities API
export const activitiesAPI = {
  // Get user activities
  getUserActivities: async (userId) => {
    const response = await api.get(`/api/activities/${userId}`);
    return response.data;
  },
};

export default api;



