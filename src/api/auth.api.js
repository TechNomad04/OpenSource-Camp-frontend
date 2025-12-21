import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

export const login = async (email, password) => {
  const response = await authAPI.post('/login', { email, password });
  return response.data;
};

