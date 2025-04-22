
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileItem, formatFileSize } from '@/hooks/use-file-system';
import { Download, Share, X } from 'lucide-react';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{file.name}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={15} />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-secondary/50 rounded-lg p-4">
        {file.type === 'image' && file.url ? (
          <div className="max-h-full">
            <img 
              src={file.url} 
              alt={file.name} 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
            />
          </div>
        ) : file.type === 'pdf' && file.url ? (
          <div className="w-full h-full">
            <iframe 
              src={`${file.url}#toolbar=0`}
              className="w-full h-full rounded-lg border"
              title={file.name}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-border mb-4">
              {file.type === 'pdf' ? (
                <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM5.5 10.5C5.22386 10.5 5 10.7239 5 11C5 11.2761 5.22386 11.5 5.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11C11 10.7239 10.7761 10.5 10.5 10.5H5.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H7C7.27614 6 7.5 5.77614 7.5 5.5C7.5 5.22386 7.27614 5 7 5H4.5ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H8C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5H4.5Z" fill="#F44336" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5Z" fill="#4A90E2" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
            <p className="text-center max-w-md">
              Questa tipologia di file non può essere visualizzata in anteprima. Clicca qui sotto per scaricare il file.
            </p>
            <Button className="mt-4" asChild>
              <a href={file.url} download target="_blank" rel="noopener noreferrer">
                Scarica File
              </a>
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          {file.size !== undefined && file.modified && (
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)} • Modificato {file.modified}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={file.url} download target="_blank" rel="noopener noreferrer">
              <Download size={15} className="mr-2" />
              Scarica
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <Share size={15} className="mr-2" />
            Condividi
          </Button>
        </div>
      </div>
    </div>
  );
};
