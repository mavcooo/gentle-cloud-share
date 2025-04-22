
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { FilePreview } from './file-preview';

interface File {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'pdf' | 'other';
  size?: string;
  modified?: string;
  thumbnail?: string;
}

interface FileExplorerProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ viewMode, setViewMode }) => {
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for files and folders
  const mockFiles: File[] = [
    { id: '1', name: 'Documents', type: 'folder' },
    { id: '2', name: 'Photos', type: 'folder' },
    { id: '3', name: 'Videos', type: 'folder' },
    { id: '4', name: 'Vacation', type: 'image', size: '2.4 MB', modified: 'Apr 12, 2023', thumbnail: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '5', name: 'Family Photo', type: 'image', size: '1.8 MB', modified: 'May 22, 2023', thumbnail: 'https://images.unsplash.com/photo-1541591425126-4e9be8bbeb3c?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '6', name: 'Project Report', type: 'document', size: '567 KB', modified: 'Jun 03, 2023' },
    { id: '7', name: 'Resume', type: 'pdf', size: '843 KB', modified: 'Dec 15, 2022' },
    { id: '8', name: 'Meeting Notes', type: 'document', size: '122 KB', modified: 'Apr 19, 2023' },
    { id: '9', name: 'Birthday Party', type: 'image', size: '3.2 MB', modified: 'Jan 30, 2023', thumbnail: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '10', name: 'Tax Documents', type: 'pdf', size: '1.1 MB', modified: 'Mar 24, 2023' },
  ];
  
  const filteredFiles = searchQuery
    ? mockFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockFiles;
  
  const handleFileClick = (file: File) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name]);
    } else {
      setSelectedFile(file);
    }
  };
  
  const navigateToPath = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };
  
  const closePreview = () => {
    setSelectedFile(null);
  };
  
  // Render the file icon based on type
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
      case 'image':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98867 7.64773L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
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
      case 'pdf':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM5.5 10.5C5.22386 10.5 5 10.7239 5 11C5 11.2761 5.22386 11.5 5.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11C11 10.7239 10.7761 10.5 10.5 10.5H5.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H7C7.27614 6 7.5 5.77614 7.5 5.5C7.5 5.22386 7.27614 5 7 5H4.5ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H8C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5H4.5Z" fill="#F44336" fillRule="evenodd" clipRule="evenodd"></path>
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
  
  // Render file grid item
  const renderGridItem = (file: File) => (
    <div 
      key={file.id}
      className="file-card transition-all cursor-pointer"
      onClick={() => handleFileClick(file)}
    >
      <div className="flex flex-col items-center">
        {file.type === 'image' && file.thumbnail ? (
          <div className="w-24 h-24 mb-2 rounded-lg overflow-hidden border border-border">
            <img 
              src={file.thumbnail} 
              alt={file.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-2">{renderFileIcon(file.type)}</div>
        )}
        <div className="font-medium text-center truncate w-full">{file.name}</div>
        {file.size && (
          <div className="text-xs text-muted-foreground">{file.size}</div>
        )}
      </div>
    </div>
  );
  
  // Render file list item
  const renderListItem = (file: File) => (
    <div 
      key={file.id}
      className="file-card mb-2 transition-all cursor-pointer"
      onClick={() => handleFileClick(file)}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {file.type === 'image' && file.thumbnail ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-border">
              <img 
                src={file.thumbnail} 
                alt={file.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10">{renderFileIcon(file.type)}</div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium">{file.name}</div>
          {file.size && (
            <div className="text-xs text-muted-foreground">
              {file.size} • {file.modified}
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2" onClick={(e) => e.stopPropagation()}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
  
  return (
    <div className="h-full">
      {selectedFile ? (
        <FilePreview file={selectedFile} onClose={closePreview} />
      ) : (
        <div className="h-full flex flex-col">
          {/* Breadcrumb and actions */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm">
              {currentPath.map((path, index) => (
                <div key={path} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-1 text-muted-foreground">/</span>
                  )}
                  <button 
                    className={cn(
                      "hover:underline",
                      index === currentPath.length - 1 ? "font-medium" : ""
                    )}
                    onClick={() => navigateToPath(index)}
                  >
                    {path}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setViewMode('grid')}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setViewMode('list')}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4H3C2.44772 4 2 3.55228 2 3ZM2 7.5C2 6.94772 2.44772 6.5 3 6.5H12C12.5523 6.5 13 6.94772 13 7.5C13 8.05228 12.5523 8.5 12 8.5H3C2.44772 8.5 2 8.05228 2 7.5ZM2 12C2 11.4477 2.44772 11 3 11H12C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* File list */}
          <div className={cn(
            "flex-1 overflow-y-auto",
            viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-2'
          )}>
            {filteredFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <svg width="48" height="48" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 opacity-50">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                <p>No files found</p>
              </div>
            ) : (
              filteredFiles.map((file) => (
                viewMode === 'grid' ? renderGridItem(file) : renderListItem(file)
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
