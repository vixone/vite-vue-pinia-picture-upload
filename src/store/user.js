import { defineStore } from 'pinia';
import axiosClient from '../axios';

const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    _storeToken(token) {
      localStorage.setItem('api_token', token);
      axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    },

    async fetchUser() {
      try {
        const response = await axiosClient.get('/api/user');

        this.user = response.data;
        this.user.token = localStorage.getItem('api_token');

        return response;
      } catch (error) {
        // Handle login errors
        console.error("Fetch user failed", error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
      }
    },
    async loginUser(data) {
      try {
        const response = await axiosClient.post('/api/login', data);

        const { token, user } = response.data;
        this._storeToken(token);

        this.user = user;
        this.user.token = token;

        return response;
      } catch (error) {
        // Handle login errors
        console.error("Login failed:", error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
      }
    },
    async registerUser(data) {
      try {
        const response = await axiosClient.post('/api/register', data);

        // Store the token in localStorage
        localStorage.setItem('api_token', response.data.token);

        const { token, user } = response.data;
        this._storeToken(token);

        this.user = user;
        this.user.token = token;

        return response;
      } catch (error) {
        // Handle login errors
        console.error("Registration failed:", error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
      }
    },
    async logout() {
      try {
        const response = await axiosClient.post('/api/logout');

        this.user = null;
        localStorage.removeItem('api_token');
        delete axiosClient.defaults.headers['Authorization'];

        return response;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
      }
    },
  }
});

export default useUserStore;
