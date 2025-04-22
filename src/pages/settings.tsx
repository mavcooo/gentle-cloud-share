
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    autoSaveFiles: true,
    darkMode: false,
  });
  
  const [storagePlan, setStoragePlan] = useState('basic');
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Profile saved',
      description: 'Your profile information has been updated.',
    });
  };
  
  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    });
    
    toast({
      title: 'Preference updated',
      description: `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} has been ${preferences[key] ? 'disabled' : 'enabled'}.`,
    });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 p-4 md:p-6 max-w-screen overflow-auto">
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your file storage experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications about file activity
                  </p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={() => handlePreferenceChange('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-Save Files</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save edited files
                  </p>
                </div>
                <Switch 
                  id="auto-save"
                  checked={preferences.autoSaveFiles}
                  onCheckedChange={() => handlePreferenceChange('autoSaveFiles')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Switch to dark theme
                  </p>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={preferences.darkMode}
                  onCheckedChange={() => handlePreferenceChange('darkMode')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Storage Plan</CardTitle>
              <CardDescription>
                Manage your storage capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${storagePlan === 'basic' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setStoragePlan('basic')}
                >
                  <div className="font-semibold mb-1">Basic</div>
                  <div className="text-2xl font-bold mb-2">100GB</div>
                  <div className="text-sm text-muted-foreground mb-4">Free forever</div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      100GB storage
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      File sharing
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                      Advanced features
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">Current Plan</Button>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${storagePlan === 'pro' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setStoragePlan('pro')}
                >
                  <div className="font-semibold mb-1">Pro</div>
                  <div className="text-2xl font-bold mb-2">500GB</div>
                  <div className="text-sm text-muted-foreground mb-4">$4.99/month</div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      500GB storage
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      File sharing
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      Advanced features
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">Upgrade</Button>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${storagePlan === 'family' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setStoragePlan('family')}
                >
                  <div className="font-semibold mb-1">Family</div>
                  <div className="text-2xl font-bold mb-2">2TB</div>
                  <div className="text-sm text-muted-foreground mb-4">$9.99/month</div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      2TB storage
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      File sharing
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      Advanced features
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 text-family-green" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8271 4.30308 11.6382 4.59198L7.63821 11.092C7.44932 11.3809 7.06197 11.4522 6.77307 11.2633C6.48417 11.0744 6.41289 10.687 6.60178 10.3981L10.6018 3.89806C10.7907 3.60916 11.178 3.53789 11.4669 3.72684Z" fill="currentColor"></path>
                        <path d="M11.4999 3.91675C11.4999 3.68533 11.2771 3.49999 10.9999 3.49999C10.7227 3.49999 10.4999 3.68533 10.4999 3.91675L10.4999 7.08341C10.4999 7.31483 10.7227 7.50016 10.9999 7.50016C11.2771 7.50016 11.4999 7.31483 11.4999 7.08341L11.4999 3.91675Z" fill="currentColor"></path>
                        <path d="M3.99994 7.08341C3.99994 7.31483 4.22288 7.50016 4.50004 7.50016C4.7772 7.50016 5.00014 7.31483 5.00014 7.08341L5.00014 3.91675C5.00014 3.68533 4.7772 3.49999 4.50004 3.49999C4.22288 3.49999 3.99994 3.68533 3.99994 3.91675L3.99994 7.08341Z" fill="currentColor"></path>
                        <path d="M4.99994 6.00032C4.99994 5.76891 4.77699 5.58357 4.49983 5.58357C4.22268 5.58357 3.99973 5.76891 3.99973 6.00032L3.99973 10.0003C3.99973 10.2317 4.22268 10.4171 4.49983 10.4171C4.77699 10.4171 4.99994 10.2317 4.99994 10.0003L4.99994 6.00032Z" fill="currentColor"></path>
                      </svg>
                      Family sharing (6 users)
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">Upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
