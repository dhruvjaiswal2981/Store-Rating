import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, logout as authLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          // Here you would typically validate the token with the backend
          // For simplicity, we'll just decode it (in a real app, verify with backend)
          const userData = JSON.parse(atob(token.split('.')[1]));
          setUser(userData);
          localStorage.setItem('token', token);
        }
      } catch (err) {
        console.error('Token validation failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const login = async (email, password) => {
  try {
    setLoading(true);
    const response = await authLogin(email, password);
    console.log('Login response:', response); // Debug log
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    navigate(getDashboardRoute(response.user.role));
  } catch (err) {
    console.error('Login error:', err); // Debug log
    const errorMessage = err.response?.data?.message || err.message || 'Login failed';
    setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

const register = async (userData) => {
  try {
    setLoading(true);
    const response = await authRegister(userData);
    setToken(response.token);
    setUser(response.user);
    navigate('/login'); // Redirect to login after registration
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
    setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

const logout = () => {
  authLogout();
  setUser(null);
  setToken(null);
  localStorage.removeItem('token');
  navigate('/login'); // Redirect to login after logout
};

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'admin': return '/admin/dashboard';
      case 'storeOwner': return '/store/dashboard';
      case 'user': return '/user/stores';
      default: return '/';
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);