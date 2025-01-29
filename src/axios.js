import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  //withXSRFToken: true,
});

// reference in case we ever want to add bearer auth
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('api_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;
