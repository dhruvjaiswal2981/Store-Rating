import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAdminDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data';
    throw new Error(errorMessage);
  }
};

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/users`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create user';
    throw new Error(errorMessage);
  }
};

export const createStore = async (token, storeData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/stores`, storeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create store';
    throw new Error(errorMessage);
  }
};

export const getAdminStores = async (token, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/stores`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch stores';
    throw new Error(errorMessage);
  }
};

export const getAdminUsers = async (token, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch users';
    throw new Error(errorMessage);
  }
};