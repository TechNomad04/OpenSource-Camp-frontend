import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const resourceAPI = axios.create({
  baseURL: `${API_BASE_URL}/resources`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Add token to requests
resourceAPI.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllResources = async () => {
  const response = await resourceAPI.get('/');
  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await resourceAPI.post('/', resourceData);
  return response.data;
};

export const updateResource = async (id, resourceData) => {
  const response = await resourceAPI.put(`/${id}`, resourceData);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await resourceAPI.delete(`/${id}`);
  return response.data;
};

export const markAsCompleted = async (id) => {
  const response = await resourceAPI.post(`/${id}/complete`);
  return response.data;
};

export const toggleCompletion = async (id) => {
  const response = await resourceAPI.post(`/${id}/complete`);
  return response.data;
};

export const getAnalytics = async () => {
  const response = await resourceAPI.get('/analytics');
  return response.data;
};

