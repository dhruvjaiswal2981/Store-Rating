// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return {
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return {
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};