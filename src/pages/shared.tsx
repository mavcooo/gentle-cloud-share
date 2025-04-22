
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SharedPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Mock data for shared files
  const sharedFiles = [
    {
      id: '1',
      name: 'Family Photos 2023',
      type: 'folder',
      owner: 'You',
      shared: [
        { name: 'Sarah Miller', avatar: 'SM' },
        { name: 'John Doe', avatar: 'JD' },
        { name: 'Emma Wilson', avatar: 'EW' },
      ],
      date: 'May 12, 2023'
    },
    {
      id: '2',
      name: 'Vacation Planning.docx',
      type: 'document',
      owner: 'Sarah Miller',
      shared: [
        { name: 'You', avatar: 'YO' },
        { name: 'Emma Wilson', avatar: 'EW' },
      ],
      date: 'June 3, 2023'
    },
    {
      id: '3',
      name: 'Home Budget.xlsx',
      type: 'spreadsheet',
      owner: 'You',
      shared: [
        { name: 'John Doe', avatar: 'JD' },
      ],
      date: 'Apr 28, 2023'
    },
    {
      id: '4',
      name: 'Project Presentation.pptx',
      type: 'presentation',
      owner: 'John Doe',
      shared: [
        { name: 'You', avatar: 'YO' },
        { name: 'Sarah Miller', avatar: 'SM' },
        { name: 'Emma Wilson', avatar: 'EW' },
      ],
      date: 'Mar 15, 2023'
    },
  ];
  
  // Function to render file type icon
  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H7.12713L8.06065 4.40033C8.13563 4.50438 8.26166 4.56862 8.39575 4.56862H12.5C12.7761 4.56862 13 4.79248 13 5.06862V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5ZM2.5 2C1.67157 2 1 2.67157 1 3.5V11.5C1 12.3284 1.67157 13 2.5 13H12.5C13.3284 13 14 12.3284 14 11.5V5.06862C14 4.24019 13.3284 3.56862 12.5 3.56862H8.75154L7.81802 2.16829C7.59415 1.85615 7.22661 1.66667 6.83333 1.66667H2.5C1.67157 1.66667 1 2.33824 1 3.16667V11.5C1 11.5 1 12 1.5 12C1.5 12 2 12 2 11.5V3.16667C2 2.89052 2.22386 2.66667 2.5 2.66667H6.83333C6.90496 2.66667 6.97138 2.70229 7.01168 2.76369L7.94521 4.16536C8.16908 4.4775 8.53662 4.66667 8.92989 4.66667H12.5C12.7761 4.66667 13 4.89052 13 5.16667V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'spreadsheet':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5ZM4 4H7V11H4V4ZM8 4H11V11H8V4Z" fill="#4CAF50" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'presentation':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V10C13 10.5523 12.5523 11 12 11H8.5V13H10.5C10.7761 13 11 13.2239 11 13.5C11 13.7761 10.7761 14 10.5 14H4.5C4.22386 14 4 13.7761 4 13.5C4 13.2239 4.22386 13 4.5 13H6.5V11H3C2.44772 11 2 10.5523 2 10V3ZM3 3H12V10H3V3Z" fill="#FF9800" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
    }
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
          <h1 className="text-3xl font-bold">Shared Files</h1>
          <p className="text-muted-foreground">Files that you've shared with others or that have been shared with you</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {sharedFiles.map((file) => (
            <Card key={file.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                {renderFileIcon(file.type)}
                <div>
                  <CardTitle>{file.name}</CardTitle>
                  <CardDescription>
                    {file.owner === 'You' ? 'Owned by you' : `Shared by ${file.owner}`} • {file.date}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-sm mr-2">Shared with:</div>
                  <div className="flex -space-x-2">
                    {file.shared.map((person, index) => (
                      <Avatar key={index} className="h-7 w-7 border-2 border-background">
                        <AvatarImage src="" alt={person.name} />
                        <AvatarFallback className="text-xs">{person.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1C7.22386 1 7 1.22386 7 1.5V8.5C7 8.77614 7.22386 9 7.5 9C7.77614 9 8 8.77614 8 8.5V1.5C8 1.22386 7.77614 1 7.5 1ZM4.85355 4.14645C4.65829 4.34171 4.65829 4.65829 4.85355 4.85355L7.14645 7.14645C7.34171 7.34171 7.65829 7.34171 7.85355 7.14645L10.1464 4.85355C10.3417 4.65829 10.3417 4.34171 10.1464 4.14645C9.95118 3.95118 9.63461 3.95118 9.43934 4.14645L7.5 6.08579L5.56066 4.14645C5.36539 3.95118 5.04882 3.95118 4.85355 4.14645ZM2.5 10C2.22386 10 2 10.2239 2 10.5C2 10.7761 2.22386 11 2.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H2.5ZM2 13.5C2 13.2239 2.22386 13 2.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5ZM11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6ZM5.88924 8.06292L9.21421 9.43257C9.0389 9.70701 8.93845 10.0293 8.93845 10.375C8.93845 11.2713 9.66715 12 10.5635 12C11.4598 12 12.1885 11.2713 12.1885 10.375C12.1885 9.47868 11.4598 8.75 10.5635 8.75C10.3431 8.75 10.1337 8.79645 9.94231 8.88115L6.61734 7.51151C6.6388 7.4067 6.65 7.29787 6.65 7.1875C6.65 7.07713 6.6388 6.9683 6.61734 6.86349L9.94231 5.49385C10.1337 5.57855 10.3431 5.625 10.5635 5.625C11.4598 5.625 12.1885 4.89632 12.1885 4C12.1885 3.10368 11.4598 2.375 10.5635 2.375C9.66715 2.375 8.93845 3.10368 8.93845 4C8.93845 4.3457 9.0389 4.66795 9.21421 4.94239L5.88924 6.31204C5.697 6.00515 5.36357 5.79141 4.98155 5.75259V8.62237C5.36357 8.58355 5.697 8.36981 5.88924 8.06292Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Share a new file</h2>
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 bg-primary/10 rounded-full p-5">
                <svg width="36" height="36" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5ZM11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6ZM5.88924 8.06292L9.21421 9.43257C9.0389 9.70701 8.93845 10.0293 8.93845 10.375C8.93845 11.2713 9.66715 12 10.5635 12C11.4598 12 12.1885 11.2713 12.1885 10.375C12.1885 9.47868 11.4598 8.75 10.5635 8.75C10.3431 8.75 10.1337 8.79645 9.94231 8.88115L6.61734 7.51151C6.6388 7.4067 6.65 7.29787 6.65 7.1875C6.65 7.07713 6.6388 6.9683 6.61734 6.86349L9.94231 5.49385C10.1337 5.57855 10.3431 5.625 10.5635 5.625C11.4598 5.625 12.1885 4.89632 12.1885 4C12.1885 3.10368 11.4598 2.375 10.5635 2.375C9.66715 2.375 8.93845 3.10368 8.93845 4C8.93845 4.3457 9.0389 4.66795 9.21421 4.94239L5.88924 6.31204C5.697 6.00515 5.36357 5.79141 4.98155 5.75259V8.62237C5.36357 8.58355 5.697 8.36981 5.88924 8.06292Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Share files with family and friends</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Select a file from your cloud storage to share it securely with others. 
                Recipients will receive a notification.
              </p>
              <Button>Select a File to Share</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SharedPage;
