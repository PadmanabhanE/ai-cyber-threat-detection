import React, { createContext, useEffect, useState, useContext } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function apiFetch(path, options = {}) {
  const headers = new Headers({
    ...(options.headers || {}),
  });

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body !== undefined && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
}

const authApi = {
  login: (email, password) => apiFetch('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  }),
  me: () => apiFetch('/api/me'),
};

const dashboardApi = {
  getDashboard: () => apiFetch('/api/dashboard'),
  getThreats: () => apiFetch('/api/threats'),
  getIncidents: () => apiFetch('/api/incidents'),
  getAnalytics: () => apiFetch('/api/analytics'),
  getSettings: () => apiFetch('/api/settings'),
  updateSettings: (settings) => apiFetch('/api/settings', {
    method: 'POST',
    body: { settings },
  }),
};

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
