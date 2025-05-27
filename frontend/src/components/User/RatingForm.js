// src/components/User/RatingForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStoreDetails, submitRating } from '../../services/userService';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storeId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStoreDetails(token, storeId);
        setStore(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load store details');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStore();
    }
  }, [token, storeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitRating(token, storeId, rating);
      alert('Rating submitted successfully!');
      navigate('/user/stores');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to submit rating');
    }
  };

  if (loading) return <div>Loading store details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!store) return <div>Store not found</div>;

  return (
    <div className="rating-form">
      <h2>Rate {store.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>
            Your Rating (1-5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;