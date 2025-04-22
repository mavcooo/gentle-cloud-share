
import React from 'react';
import { Button } from '@/components/ui/button';

interface File {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'pdf' | 'other';
  size?: string;
  modified?: string;
  thumbnail?: string;
}

interface FilePreviewProps {
  file: File;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{file.name}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-secondary/50 rounded-lg p-4">
        {file.type === 'image' && file.thumbnail ? (
          <div className="max-h-full">
            <img 
              src={file.thumbnail} 
              alt={file.name} 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
            />
          </div>
        ) : file.type === 'pdf' ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-border mb-4">
              <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM5.5 10.5C5.22386 10.5 5 10.7239 5 11C5 11.2761 5.22386 11.5 5.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11C11 10.7239 10.7761 10.5 10.5 10.5H5.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H7C7.27614 6 7.5 5.77614 7.5 5.5C7.5 5.22386 7.27614 5 7 5H4.5ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H8C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5H4.5Z" fill="#F44336" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <p className="text-center max-w-md">
              PDF preview is not available. Click below to download the file.
            </p>
            <Button className="mt-4">Download PDF</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-border mb-4">
              <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <p className="text-center max-w-md">
              This file type cannot be previewed. Click below to download the file.
            </p>
            <Button className="mt-4">Download File</Button>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          {file.size && file.modified && (
            <p className="text-xs text-muted-foreground">
              {file.size} • Modified {file.modified}
            </p>
          )}
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
};
