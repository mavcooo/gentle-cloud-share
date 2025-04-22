
import React, { useState, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useFileSystem, formatFileSize } from '@/hooks/use-file-system';
import { Upload, XIcon, FileIcon, Image, FileText } from 'lucide-react';

interface FileUploaderProps {
  currentPath: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ currentPath }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { uploadFiles, storageUsed, storageLimit } = useFileSystem(currentPath);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  }, []);
  
  const handleFiles = useCallback((newFiles: File[]) => {
    // Verifica lo spazio disponibile
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    if (storageUsed + totalSize > storageLimit) {
      toast({
        title: 'Spazio insufficiente',
        description: 'Non hai abbastanza spazio disponibile per caricare questi file.',
        variant: 'destructive'
      });
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // Inizializza il progresso per ogni file
    const newProgress = { ...uploadProgress };
    newFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(newProgress);
    
    toast({
      title: `${newFiles.length} ${newFiles.length === 1 ? 'file' : 'file'} aggiunto`,
      description: "Il tuo caricamento è pronto.",
    });
  }, [storageUsed, storageLimit, uploadProgress, toast]);
  
  const startUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;
    
    // Simula il progresso di caricamento
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const updated = { ...prev };
        let allComplete = true;
        
        Object.keys(updated).forEach(fileName => {
          if (updated[fileName] < 100) {
            updated[fileName] += Math.random() * 10;
            if (updated[fileName] > 100) updated[fileName] = 100;
            allComplete = false;
          }
        });
        
        if (allComplete) {
          clearInterval(interval);
          
          // Effettua l'upload reale dopo la simulazione
          uploadFiles(selectedFiles).then(() => {
            setSelectedFiles([]);
            setUploadProgress({});
          });
        }
        
        return updated;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [selectedFiles, uploadFiles]);
  
  const removeFile = useCallback((fileName: string) => {
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  }, []);
  
  const getFileIcon = useCallback((fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return <Image size={24} className="text-primary" />;
      case 'pdf':
        return <FileText size={24} className="text-primary" />;
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText size={24} className="text-primary" />;
      default:
        return <FileIcon size={24} className="text-primary" />;
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Carica File</h2>
        <p className="text-sm text-muted-foreground">
          Trascina i tuoi file qui, o clicca per selezionarli
        </p>
      </div>
      
      <div
        className={cn(
          "dropzone mb-6 flex-1 flex flex-col items-center justify-center",
          isDragging && "dropzone-active"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          onChange={handleFileInput}
          multiple
        />
        
        <div className="mb-4 bg-primary/10 rounded-full p-4">
          <Upload size={42} className="text-primary" />
        </div>
        
        <div className="text-center">
          <p className="font-medium">Trascina i tuoi file qui</p>
          <p className="text-sm text-muted-foreground">
            Carica foto, documenti e altro
          </p>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{selectedFiles.length} file selezionati</h3>
            <Button onClick={startUpload}>Avvia upload</Button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {selectedFiles.map((file) => (
              <Card key={file.name} className="p-3 border">
                <div className="flex items-center">
                  <div className="mr-3 bg-family-lightBlue p-2 rounded-md">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                    <Progress 
                      value={uploadProgress[file.name] || 0} 
                      className="h-1.5 mt-1.5" 
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2 opacity-70 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.name);
                    }}
                  >
                    <XIcon size={15} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
