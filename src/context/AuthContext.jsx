import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: determinateRole(email),
        avatar: email.charAt(0).toUpperCase(),
        lastLogin: new Date(),
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const determinateRole = (email) => {
    if (email.includes('admin')) return 'admin';
    if (email.includes('analyst')) return 'analyst';
    if (email.includes('viewer')) return 'viewer';
    return 'analyst';
  };

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
