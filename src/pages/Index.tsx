
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    console.log('Redirecting to appropriate page...');
  }, []);

  // Verifica se la connessione a Supabase è configurata
  const isSupabaseConfigured = !!supabase;

  // Se Supabase non è configurato correttamente, mostra un messaggio
  if (!isSupabaseConfigured) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Configurazione Supabase richiesta</h1>
          <p className="mb-4">
            Per utilizzare questa applicazione è necessario configurare Supabase impostando le variabili d'ambiente:
            <code className="block bg-gray-100 p-2 my-2 rounded text-sm">
              VITE_SUPABASE_URL<br />
              VITE_SUPABASE_ANON_KEY
            </code>
          </p>
          <p>
            Connetti il progetto a Supabase usando il pulsante nell'interfaccia di Lovable, 
            oppure configura manualmente queste variabili nel tuo ambiente di sviluppo.
          </p>
        </div>
      </div>
    );
  }

  // Se l'utente è autenticato, reindirizza alla dashboard, altrimenti al login
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default Index;
