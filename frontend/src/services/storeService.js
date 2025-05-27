import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStoreDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/store/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data';
    throw new Error(errorMessage);
  }
};