
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { FileExplorer } from '@/components/file-explorer';
import { FileUploader } from '@/components/file-uploader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'files' | 'upload'>('files');
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <h1 className="text-3xl font-bold">My Files</h1>
          <p className="text-muted-foreground">Manage and organize your files</p>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Quick access cards */}
          <Card className="p-4 min-w-[140px] bg-family-lightBlue border-primary/10 cursor-pointer hover:shadow-md transition-shadow flex items-center">
            <div className="mr-3 text-primary">
              <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.30902 1C2.93025 1 2.58398 1.214 2.41459 1.55279L1.05279 4.27639C1.01807 4.34582 1 4.42238 1 4.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V4.5C14 4.42238 13.9819 4.34582 13.9472 4.27639L12.5854 1.55281C12.416 1.21403 12.0698 1.00001 11.691 1.00001L7.5 1.00001L3.30902 1ZM3.30902 2L7.5 2.00001L11.691 2.00001L13 4.5V12.5C13 12.7761 12.7761 13 12.5 13H2.5C2.22386 13 2 12.7761 2 12.5V4.5L3.30902 2ZM5 5C5 4.44772 5.44772 4 6 4H9C9.55228 4 10 4.44772 10 5V6C10 6.55228 9.55228 7 9 7H6C5.44772 7 5 6.55228 5 6V5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium leading-none mb-1">Recent</div>
              <div className="text-xs text-primary/70">36 files</div>
            </div>
          </Card>
          
          <Card className="p-4 min-w-[140px] bg-family-lightBlue border-primary/10 cursor-pointer hover:shadow-md transition-shadow flex items-center">
            <div className="mr-3 text-primary">
              <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5ZM11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6ZM3.5 10C2.24472 10 1.20539 10.8955 1.02988 12.1079C1.00337 12.2906 1.0861 12.4719 1.24443 12.5631C2.27668 13.192 3.84084 13.75 7.5 13.75C11.1592 13.75 12.7233 13.192 13.7556 12.5631C13.9139 12.4719 13.9966 12.2906 13.9701 12.1079C13.7946 10.8955 12.7553 10 11.5 10C10.6354 10 9.86567 10.416 9.34966 11.0729C9.12194 11.3661 8.97644 11.7111 8.53211 11.9914C8.0603 12.2906 7.49079 12.25 7.5 12.25C7.50921 12.25 6.9397 12.2906 6.46789 11.9914C6.02356 11.7111 5.87806 11.3661 5.65034 11.0729C5.13433 10.416 4.36459 10 3.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium leading-none mb-1">Shared</div>
              <div className="text-xs text-primary/70">12 files</div>
            </div>
          </Card>
          
          <Card className="p-4 min-w-[140px] bg-family-lightBlue border-primary/10 cursor-pointer hover:shadow-md transition-shadow flex items-center">
            <div className="mr-3 text-primary">
              <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98867 7.64773L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium leading-none mb-1">Photos</div>
              <div className="text-xs text-primary/70">143 items</div>
            </div>
          </Card>
          
          <Card className="p-4 min-w-[140px] bg-family-lightBlue border-primary/10 cursor-pointer hover:shadow-md transition-shadow flex items-center">
            <div className="mr-3 text-primary">
              <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium leading-none mb-1">Documents</div>
              <div className="text-xs text-primary/70">85 files</div>
            </div>
          </Card>
        </div>
        
        <Card className="border overflow-hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'files' | 'upload')} className="w-full">
            <div className="p-4 border-b">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4">
              <TabsContent value="files" className="mt-0">
                <div className="h-[calc(100vh-270px)]">
                  <FileExplorer viewMode={viewMode} setViewMode={setViewMode} />
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0">
                <div className="h-[calc(100vh-270px)]">
                  <FileUploader />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
