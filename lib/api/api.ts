import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log the request for debugging
  console.log('API Request:', {
    method: config.method?.toUpperCase(),
    url: (config.baseURL || '') + (config.url || ''),
    headers: config.headers
  });
  
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    
    // If it's a network error, provide a helpful message
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Unable to connect to the API server. Please check if the backend server is running.');
    }
    
    return Promise.reject(error);
  }
);

export default api; 