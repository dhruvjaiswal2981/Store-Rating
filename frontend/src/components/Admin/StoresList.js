import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminStores } from '../../services/adminService';

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAdminStores(token);
        setStores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Stores List</h2>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>Email: {store.email}</p>
            <p>Address: {store.address}</p>
            <p>Rating: {store.averageRating || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoresList;