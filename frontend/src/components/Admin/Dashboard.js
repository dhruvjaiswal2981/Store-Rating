// src/components/Admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminDashboard } from '../../services/adminService';


const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard(token);
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
      <h2>Admin Dashboard</h2>
      <div>
        <p>Total Users: {dashboardData.totalUsers}</p>
        <p>Total Stores: {dashboardData.totalStores}</p>
        <p>Total Ratings: {dashboardData.totalRatings}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;