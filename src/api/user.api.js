import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const userAPI = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
userAPI.interceptors.request.use(
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

export const saveGitHubUsername = async (githubUsername, clearPrevious = false) => {
  const response = await userAPI.post('/github', { githubUsername, clearPrevious });
  return response.data;
};

export const saveMicrosoftLearnEmail = async (email, clearPrevious = false) => {
  const response = await userAPI.post('/microsoft-learn', { email, clearPrevious });
  return response.data;
};

export const getUserProgress = async () => {
  const response = await userAPI.get('/me');
  return response.data;
};

export const markPageComplete = async (pageNumber) => {
  const response = await userAPI.post('/complete-page', { pageNumber });
  return response.data;
};

export const markPageIncomplete = async (pageNumber) => {
  const response = await userAPI.post('/incomplete-page', { pageNumber });
  return response.data;
};

export const updateLastViewedPage = async (pageNumber) => {
  const response = await userAPI.post('/last-viewed-page', { pageNumber });
  return response.data;
};

