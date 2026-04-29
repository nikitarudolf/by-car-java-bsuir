import axios from 'axios';


const normalizeApiBaseUrl = (rawUrl) => {
  if (!rawUrl) return '/api';
  let value = String(rawUrl).trim();
  if (!value) return '/api';

  if (!value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('/')) {
    value = `https://${value}`;
  }

  if (value.length > 1 && value.endsWith('/')) {
    value = value.slice(0, -1);
  }

  // Добавляем /api если его нет
  if (!value.endsWith('/api')) {
    value = `${value}/api`;
  }

  return value;
};

const API_BASE_URL = normalizeApiBaseUrl(process.env.REACT_APP_API_URL);

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
  (response) => {
    const contentType = response?.headers?.['content-type'] || '';
    const isHtmlResponse = typeof response.data === 'string' && response.data.toLowerCase().includes('<html');

    if (isHtmlResponse || (contentType.includes('text/html') && response.config?.url?.startsWith('/'))) {
      return Promise.reject(
        new Error('API вернул HTML вместо JSON. Проверьте REACT_APP_API_URL в Railway.')
      );
    }

    return response;
  },
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
