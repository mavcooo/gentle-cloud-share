
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const ProfileTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [profile, setProfile] = React.useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Profilo aggiornato',
      description: 'Le tue informazioni sono state aggiornate.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Profilo</CardTitle>
        <CardDescription>
          Aggiorna le tue informazioni personali
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-family-lightBlue flex items-center justify-center">
                <User size={40} className="text-primary" />
              </div>
              <Button size="sm" className="absolute bottom-0 right-0 rounded-full" variant="secondary">
                Cambia
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              L'email non può essere modificata
            </p>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button type="submit">Salva modifiche</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
