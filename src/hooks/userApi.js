import { useAuth } from '../contexts/AuthContext';

export const useApi = () => {
  const { logout } = useAuth();

  const apiRequest = async (url, options = {}) => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      logout();
      throw new Error('Token não encontrado');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      logout();
      throw new Error('Sessão expirada');
    }

    return response;
  };

  return { apiRequest };
};