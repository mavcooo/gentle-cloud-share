
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthGuard = (requireAdmin = false) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (requireAdmin && !isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, loading, isAdmin, navigate, requireAdmin]);

  return { isProtected: !!user, isLoading: loading };
};
