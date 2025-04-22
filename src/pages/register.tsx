
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMockEnvironment, setIsMockEnvironment] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Controlla se siamo in ambiente mock
  useEffect(() => {
    const checkEnvironment = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://mock.supabase.co') {
        setIsMockEnvironment(true);
      }
    };
    
    checkEnvironment();
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

    // Se siamo in ambiente mock, mostra un messaggio specifico
    if (isMockEnvironment) {
      toast({
        title: "Ambiente di sviluppo rilevato",
        description: "La registrazione non funzionerà finché non colleghi un progetto Supabase reale.",
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
      console.error(error);
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
        
        {isMockEnvironment && (
          <div className="mb-4 p-4 bg-amber-100 border border-amber-300 rounded-md text-amber-800">
            <h3 className="font-bold mb-2">Ambiente di sviluppo</h3>
            <p className="text-sm">
              Questa applicazione è configurata in modalità sviluppo senza una connessione Supabase reale.
              La registrazione e l'accesso non funzioneranno finché non colleghi un progetto Supabase.
            </p>
            <p className="text-sm mt-2">
              Clicca sul pulsante Supabase nell'interfaccia di Lovable per collegare un progetto.
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
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={toggleShowPassword}
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
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full text-base py-6"
                disabled={isLoading || isMockEnvironment}
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
