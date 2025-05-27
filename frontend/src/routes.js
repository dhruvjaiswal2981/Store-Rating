import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Admin Components
import AdminDashboard from './components/Admin/Dashboard';
import CreateUser from './components/Admin/CreateUser';
import CreateStore from './components/Admin/CreateStore';
import StoresList from './components/Admin/StoresList';
import UsersList from './components/Admin/UsersList';

// User Components
import UserStores from './components/User/StoresList';
import RatingForm from './components/User/RatingForm';

// Store Owner Components
import StoreDashboard from './components/StoreOwner/Dashboard';

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'storeOwner': return '/store/dashboard';
      case 'user': return '/user/stores';
      default: return '/login';
    }
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <Register />} 
      />
      
      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stores/create"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateStore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <StoresList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersList />
          </ProtectedRoute>
        }
      />

      {/* User routes */}
      <Route
        path="/user/stores"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserStores />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/rating/:storeId"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <RatingForm />
          </ProtectedRoute>
        }
      />

      {/* Store owner routes */}
      <Route
        path="/store/dashboard"
        element={
          <ProtectedRoute allowedRoles={['storeOwner']}>
            <StoreDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to={getDefaultRoute()} />}
      />
    </Routes>
  );
};

export default AppRoutes;