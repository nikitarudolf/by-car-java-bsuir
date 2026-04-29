import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Произошла ошибка на сервере';
      console.error('API Error:', error.response.data);

      const customError = new Error(errorMessage);
      customError.status = error.response.status;
      customError.data = error.response.data;
      return Promise.reject(customError);
    } else if (error.request) {

      console.error('Network Error:', error.message);
      return Promise.reject(new Error('Ошибка сети. Проверьте подключение к интернету.'));
    } else {
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
