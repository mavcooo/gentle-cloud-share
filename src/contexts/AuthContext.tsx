
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import type { Database } from '@/integrations/supabase/types';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST to avoid race conditions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check admin status whenever user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data } = await supabase
            .from('user_roles' as const)
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();

          setIsAdmin(!!data && data.role === 'admin');
        } catch (error) {
          console.error('Errore nel controllo del ruolo admin:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Accesso effettuato",
        description: "Hai effettuato l'accesso con successo.",
      });
      return { error: null };
    } catch (error) {
      toast({
        title: "Errore di accesso",
        description: (error as Error).message,
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { name },
        }
      });
      if (error) throw error;
      toast({
        title: "Registrazione completata",
        description: "Account creato con successo. Verifica la tua email.",
      });
      return { error: null };
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      toast({
        title: "Errore di registrazione",
        description: (error as Error).message,
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Disconnesso",
      description: "Hai effettuato il logout con successo.",
    });
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
