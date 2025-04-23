import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, User } from 'lucide-react';
import { StorageInfo } from '@/components/storage-info';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
  });
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Profilo aggiornato',
      description: 'Le tue informazioni sono state aggiornate.',
    });
  };
  
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
    <div className="min-h-screen flex bg-background">
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 p-4 md:p-6 transition-all overflow-hidden ${isMobile ? 'ml-0' : ''}`}>
        {isMobile && !sidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mb-4" 
            onClick={toggleSidebar}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Impostazioni</h1>
          <p className="text-muted-foreground">Gestisci il tuo account e le preferenze</p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profilo</TabsTrigger>
            <TabsTrigger value="security">Sicurezza</TabsTrigger>
            <TabsTrigger value="preferences">Preferenze</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
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
          </TabsContent>
          
          <TabsContent value="security">
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
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <StorageInfo />
              
              <Card>
                <CardHeader>
                  <CardTitle>Preferenze</CardTitle>
                  <CardDescription>
                    Personalizza le tue preferenze di notifica e visualizzazione
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notifiche</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifiche app</p>
                          <p className="text-sm text-muted-foreground">
                            Ricevi notifiche per attività importanti
                          </p>
                        </div>
                        <Switch 
                          checked={showNotifications} 
                          onCheckedChange={setShowNotifications} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifiche email</p>
                          <p className="text-sm text-muted-foreground">
                            Ricevi email per notifiche importanti
                          </p>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Lingua e Regione</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Lingua</Label>
                        <select 
                          id="language" 
                          className="w-full border border-input bg-background px-3 py-2 text-base rounded-md"
                        >
                          <option value="it">Italiano</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => toast({ title: 'Preferenze salvate' })}>
                      Salva preferenze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;
