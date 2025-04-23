
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { StorageInfo } from '@/components/storage-info';

export const PreferencesTab = () => {
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  return (
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
  );
};
