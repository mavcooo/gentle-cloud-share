
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/logo';
import { useAuth } from '@/contexts/AuthContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/integrations/supabase/types';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Verifica la connessione a Supabase
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('connecting');
        // Esegui una query semplice per verificare la connessione
        const { error } = await supabase.from('user_roles' as const).select('id').limit(1);
        if (error && error.code !== 'PGRST116') { // PGRST116 è "relation does not exist" che è ok se la tabella non esiste ancora
          console.error('Errore di connessione a Supabase:', error);
          setConnectionStatus('error');
        } else {
          setConnectionStatus('connected');
        }
      } catch (error) {
        console.error('Errore durante il test della connessione:', error);
        setConnectionStatus('error');
      }
    };

    checkConnection();
  }, []);

  // Reindirizza se l'utente è già autenticato
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validazione client-side
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Errore di compilazione",
        description: "Compila tutti i campi.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Le password non corrispondono",
        description: "Verifica che le password inserite siano identiche.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password troppo corta",
        description: "La password deve contenere almeno 8 caratteri.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, name);
      if (error) throw error;

      // La redirezione viene gestita da AuthContext se la registrazione è immediata,
      // altrimenti, mostriamo un messaggio di conferma
      setIsLoading(false);
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-family-lightBlue p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {connectionStatus === 'error' && (
          <div className="mb-4 p-4 bg-amber-100 border border-amber-300 rounded-md text-amber-800">
            <h3 className="font-bold mb-2">Errore di connessione a Supabase</h3>
            <p className="text-sm">
              Non è possibile connettersi a Supabase. Verifica la configurazione del progetto 
              e assicurati che il servizio Supabase sia attivo.
            </p>
          </div>
        )}

        {connectionStatus === 'connecting' && (
          <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-md text-blue-800">
            <h3 className="font-bold mb-2">Connessione in corso...</h3>
            <p className="text-sm">
              Stiamo verificando la connessione a Supabase. Attendi un momento.
            </p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crea un Account</CardTitle>
            <CardDescription className="text-center">
              Unisciti a FamilyCloud per archiviare e condividere i tuoi file in modo sicuro
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name" 
                  placeholder="Mario Rossi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading || connectionStatus !== 'connected'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@esempio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || connectionStatus !== 'connected'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading || connectionStatus !== 'connected'}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={toggleShowPassword}
                    disabled={isLoading || connectionStatus !== 'connected'}
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  La password deve contenere almeno 8 caratteri
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Conferma Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading || connectionStatus !== 'connected'}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full text-base py-6"
                disabled={isLoading || connectionStatus !== 'connected'}
              >
                {isLoading ? 'Creazione account...' : 'Crea Account'}
              </Button>
              <p className="text-center text-sm">
                Hai già un account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Accedi
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
