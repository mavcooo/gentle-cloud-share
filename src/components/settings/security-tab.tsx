
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const SecurityTab = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: 'Errore',
        description: 'Le password non corrispondono.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Password aggiornata',
      description: 'La tua password è stata modificata con successo.',
    });
    
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sicurezza</CardTitle>
        <CardDescription>
          Gestisci la tua password e le impostazioni di sicurezza
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Password attuale</Label>
            <div className="relative">
              <Input 
                id="currentPassword" 
                type={showPassword ? "text" : "password"}
                value={security.currentPassword}
                onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
              />
              <Button 
                type="button"
                variant="ghost" 
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nuova password</Label>
            <Input 
              id="newPassword" 
              type="password"
              value={security.newPassword}
              onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Conferma password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              value={security.confirmPassword}
              onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button type="submit">Aggiorna password</Button>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-medium mb-4">Altre opzioni</h3>
          <Button variant="destructive" onClick={handleLogout}>
            Disconnetti
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
