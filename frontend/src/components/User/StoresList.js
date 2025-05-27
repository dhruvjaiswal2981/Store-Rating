// src/components/User/StoresList.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserStores } from '../../services/userService';

const UserStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        console.log('Current user:', user); // Debug log
        const data = await getUserStores(token);
        setStores(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load stores');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStores();
    }
  }, [token, user]);

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stores.length) return <div>No stores found</div>;

  return (
    <div className="user-stores">
      <h2>Available Stores</h2>
      <div className="stores-grid">
        {stores.map(store => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Average Rating: {store.averageRating?.toFixed(1) || 'Not rated yet'}</p>
            <a href={`/user/rating/${store.id}`} className="rate-button">
              Rate This Store
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStores;