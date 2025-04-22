
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { FileExplorer } from '@/components/file-explorer';
import { FileUploader } from '@/components/file-uploader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { formatFileSize } from '@/hooks/use-file-system';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'files' | 'upload'>('files');
  const [currentPath, setCurrentPath] = useState('');
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handlePathChange = (newPath: string) => {
    setCurrentPath(newPath);
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
          <h1 className="text-3xl font-bold">I miei File</h1>
          <p className="text-muted-foreground">Gestisci e organizza i tuoi file</p>
        </div>
        
        <StorageStatus />
        
        <Card className="border overflow-hidden mt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'files' | 'upload')} className="w-full">
            <div className="p-4 border-b">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="files">File</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4">
              <TabsContent value="files" className="mt-0">
                <div className="h-[calc(100vh-370px)]">
                  <FileExplorer 
                    viewMode={viewMode} 
                    setViewMode={setViewMode} 
                    currentPath={currentPath}
                    onPathChange={handlePathChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0">
                <div className="h-[calc(100vh-370px)]">
                  <FileUploader currentPath={currentPath} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

const StorageStatus = () => {
  const { user } = useAuth();
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(10 * 1024 * 1024 * 1024); // Default 10GB
  const [storagePercentage, setStoragePercentage] = useState(0);
  
  // Questo verrebbe in realtà popolato con i dati da Supabase
  React.useEffect(() => {
    // Simulazione di dati di storage
    if (user) {
      const used = Math.random() * 5 * 1024 * 1024 * 1024; // Random tra 0 e 5GB
      setStorageUsed(used);
      setStoragePercentage((used / storageLimit) * 100);
    }
  }, [user]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Spazio utilizzato</h3>
        <span className="text-sm text-muted-foreground">
          {formatFileSize(storageUsed)} / {formatFileSize(storageLimit)}
        </span>
      </div>
      <Progress value={storagePercentage} className="h-2" />
    </div>
  );
};

export default DashboardPage;
