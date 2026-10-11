import React, { createContext, useEffect, useState, useContext } from 'react';
import { authApi, dashboardApi } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = (payload) => {
    if (!payload) return null;
    return {
      ...payload,
      avatar: payload.avatar || (payload.name || payload.email || 'U').charAt(0).toUpperCase(),
    };
  };

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.token);
      setUser(normalizeUser(data.user));
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    authApi.me()
      .then(({ user: currentUser }) => setUser(normalizeUser(currentUser)))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export { authApi, dashboardApi };
