import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUserStores = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/stores`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error.response?.data || error.message);
    throw error;
  }
};

export const getStoreDetails = async (token, storeId) => {
  try {
    const response = await axios.get(`${API_URL}/user/stores/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching store details:', error.response?.data || error.message);
    throw error;
  }
};

export const submitRating = async (token, storeId, rating) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/rating`,
      { storeId, rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error.response?.data || error.message);
    throw error;
  }
};
