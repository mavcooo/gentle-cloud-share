
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    console.log('Redirecting to appropriate page...');
  }, []);

  // Se l'utente è autenticato, reindirizza alla dashboard, altrimenti al login
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default Index;
