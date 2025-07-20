import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do Context
const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se o usuário está autenticado ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  const setAuthenticatedUser = () => {
    setIsAuthenticated(true);
  };

  const value = {
    isAuthenticated,
    isLoading,
    logout,
    setAuthenticatedUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export default do Provider para satisfazer o Fast Refresh
export default AuthProvider;