
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const RecentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Mock data for recent files
  const recentFiles = [
    {
      id: '1',
      name: 'Family Budget 2023.xlsx',
      type: 'spreadsheet',
      lastOpened: 'Today, 10:35 AM',
      size: '245 KB'
    },
    {
      id: '2',
      name: 'Summer Vacation Photos',
      type: 'folder',
      lastOpened: 'Yesterday, 8:15 PM',
      size: '1.2 GB'
    },
    {
      id: '3',
      name: 'Resume - Updated.pdf',
      type: 'pdf',
      lastOpened: 'Yesterday, 3:40 PM',
      size: '450 KB'
    },
    {
      id: '4',
      name: 'Family Photo.jpg',
      type: 'image',
      lastOpened: '2 days ago',
      size: '3.5 MB'
    },
    {
      id: '5',
      name: 'Project Presentation.pptx',
      type: 'presentation',
      lastOpened: '3 days ago',
      size: '4.8 MB'
    },
    {
      id: '6',
      name: 'Meeting Notes.docx',
      type: 'document',
      lastOpened: '4 days ago',
      size: '128 KB'
    },
    {
      id: '7',
      name: 'Recipes',
      type: 'folder',
      lastOpened: '5 days ago',
      size: '36 MB'
    },
    {
      id: '8',
      name: 'Shopping List.txt',
      type: 'document',
      lastOpened: '1 week ago',
      size: '2 KB'
    },
  ];
  
  const filteredFiles = searchQuery
    ? recentFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recentFiles;
  
  // Function to render file type icon
  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H7.12713L8.06065 4.40033C8.13563 4.50438 8.26166 4.56862 8.39575 4.56862H12.5C12.7761 4.56862 13 4.79248 13 5.06862V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5ZM2.5 2C1.67157 2 1 2.67157 1 3.5V11.5C1 12.3284 1.67157 13 2.5 13H12.5C13.3284 13 14 12.3284 14 11.5V5.06862C14 4.24019 13.3284 3.56862 12.5 3.56862H8.75154L7.81802 2.16829C7.59415 1.85615 7.22661 1.66667 6.83333 1.66667H2.5C1.67157 1.66667 1 2.33824 1 3.16667V11.5C1 11.5 1 12 1.5 12C1.5 12 2 12 2 11.5V3.16667C2 2.89052 2.22386 2.66667 2.5 2.66667H6.83333C6.90496 2.66667 6.97138 2.70229 7.01168 2.76369L7.94521 4.16536C8.16908 4.4775 8.53662 4.66667 8.92989 4.66667H12.5C12.7761 4.66667 13 4.89052 13 5.16667V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'spreadsheet':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5ZM4 4H7V11H4V4ZM8 4H11V11H8V4Z" fill="#4CAF50" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'presentation':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V10C13 10.5523 12.5523 11 12 11H8.5V13H10.5C10.7761 13 11 13.2239 11 13.5C11 13.7761 10.7761 14 10.5 14H4.5C4.22386 14 4 13.7761 4 13.5C4 13.2239 4.22386 13 4.5 13H6.5V11H3C2.44772 11 2 10.5523 2 10V3ZM3 3H12V10H3V3Z" fill="#FF9800" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'pdf':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM5.5 10.5C5.22386 10.5 5 10.7239 5 11C5 11.2761 5.22386 11.5 5.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11C11 10.7239 10.7761 10.5 10.5 10.5H5.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H7C7.27614 6 7.5 5.77614 7.5 5.5C7.5 5.22386 7.27614 5 7 5H4.5ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H8C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5H4.5Z" fill="#F44336" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98867 7.64773L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-family-lightBlue p-2 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <h1 className="text-3xl font-bold">Recent Files</h1>
          <p className="text-muted-foreground">Files you've accessed recently</p>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search recent files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Last Opened</TableHead>
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No recent files found
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiles.map((file) => (
                  <TableRow key={file.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {renderFileIcon(file.type)}
                        <span className="ml-3">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="capitalize">{file.type}</span>
                    </TableCell>
                    <TableCell>{file.lastOpened}</TableCell>
                    <TableCell className="hidden md:table-cell">{file.size}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 1C7.22386 1 7 1.22386 7 1.5V8.5C7 8.77614 7.22386 9 7.5 9C7.77614 9 8 8.77614 8 8.5V1.5C8 1.22386 7.77614 1 7.5 1ZM4.85355 4.14645C4.65829 4.34171 4.65829 4.65829 4.85355 4.85355L7.14645 7.14645C7.34171 7.34171 7.65829 7.34171 7.85355 7.14645L10.1464 4.85355C10.3417 4.65829 10.3417 4.34171 10.1464 4.14645C9.95118 3.95118 9.63461 3.95118 9.43934 4.14645L7.5 6.08579L5.56066 4.14645C5.36539 3.95118 5.04882 3.95118 4.85355 4.14645ZM2.5 10C2.22386 10 2 10.2239 2 10.5C2 10.7761 2.22386 11 2.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H2.5ZM2 13.5C2 13.2239 2.22386 13 2.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5ZM11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6ZM5.88924 8.06292L9.21421 9.43257C9.0389 9.70701 8.93845 10.0293 8.93845 10.375C8.93845 11.2713 9.66715 12 10.5635 12C11.4598 12 12.1885 11.2713 12.1885 10.375C12.1885 9.47868 11.4598 8.75 10.5635 8.75C10.3431 8.75 10.1337 8.79645 9.94231 8.88115L6.61734 7.51151C6.6388 7.4067 6.65 7.29787 6.65 7.1875C6.65 7.07713 6.6388 6.9683 6.61734 6.86349L9.94231 5.49385C10.1337 5.57855 10.3431 5.625 10.5635 5.625C11.4598 5.625 12.1885 4.89632 12.1885 4C12.1885 3.10368 11.4598 2.375 10.5635 2.375C9.66715 2.375 8.93845 3.10368 8.93845 4C8.93845 4.3457 9.0389 4.66795 9.21421 4.94239L5.88924 6.31204C5.697 6.00515 5.36357 5.79141 4.98155 5.75259V8.62237C5.36357 8.58355 5.697 8.36981 5.88924 8.06292Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default RecentPage;
