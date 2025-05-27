import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStoreDashboard } from '../../services/storeService';

const StoreDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getStoreDashboard(token);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Store Dashboard</h2>
      <div>
        <h3>{dashboardData.store.name}</h3>
        <p>Average Rating: {dashboardData.averageRating}</p>
        <h4>Recent Ratings:</h4>
        <ul>
          {dashboardData.ratings.map(rating => (
            <li key={rating.id}>
              <p>User: {rating.userName}</p>
              <p>Rating: {rating.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreDashboard;