import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRouter = ({ children }) => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    // Verifica token sempre que o componente monta
    const token = localStorage.getItem('access_token');
    if (!token) {
      logout();
    }
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white">Carregando...</div>
    </div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRouter;