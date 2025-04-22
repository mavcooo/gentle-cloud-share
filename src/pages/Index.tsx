
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    console.log('Redirecting to login page');
  }, []);

  return <Navigate to="/login" replace />;
};

export default Index;
