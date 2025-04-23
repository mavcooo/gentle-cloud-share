import React, { useState, useCallback } from 'react';
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { FilePreview } from './file-preview';
import { useFileSystem, formatFileSize } from '@/hooks/use-file-system';
import { FileItem } from '@/types/files';
import { Folder, FileIcon, Download, Share, Pencil, Trash, Grid, List, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FileExplorerProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  currentPath: string;
  onPathChange: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ 
  viewMode, 
  setViewMode, 
  currentPath,
  onPathChange
}) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameItem, setRenameItem] = useState<FileItem | null>(null);
  const [newName, setNewName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<FileItem | null>(null);
  
  const {
    files,
    loading,
    createFolder,
    deleteFile,
    renameFile,
    refreshFiles
  } = useFileSystem(currentPath);
  
  const pathParts = currentPath.split('/').filter(Boolean);
  
  const filteredFiles = searchQuery
    ? files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : files;
    
  const handleFileClick = useCallback((file: FileItem) => {
    if (file.type === 'folder') {
      const newPath = currentPath ? `${currentPath}/${file.name}` : file.name;
      onPathChange(newPath);
    } else {
      setSelectedFile(file);
    }
  }, [currentPath, onPathChange]);
  
  const navigateToPath = useCallback((index: number) => {
    if (index < 0) {
      onPathChange('');
      return;
    }
    
    const newPath = pathParts.slice(0, index + 1).join('/');
    onPathChange(newPath);
  }, [pathParts, onPathChange]);
  
  const closePreview = () => {
    setSelectedFile(null);
  };
  
  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName.trim());
      setNewFolderName('');
      setNewFolderDialogOpen(false);
    }
  };
  
  const handleRenameClick = (file: FileItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenameItem(file);
    setNewName(file.name);
    setRenameDialogOpen(true);
  };
  
  const handleRename = async () => {
    if (renameItem && newName.trim() && newName !== renameItem.name) {
      await renameFile(renameItem, newName.trim());
      setRenameDialogOpen(false);
      setRenameItem(null);
      setNewName('');
    }
  };
  
  const handleDeleteClick = (file: FileItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteItem(file);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = async () => {
    if (deleteItem) {
      await deleteFile(deleteItem);
      setDeleteDialogOpen(false);
      setDeleteItem(null);
    }
  };
  
  // Render file icon based on type
  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <Folder size={24} className="text-primary" />
          </div>
        );
      case 'image':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <FileIcon size={24} className="text-primary" />
          </div>
        );
      case 'document':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <FileIcon size={24} className="text-primary" />
          </div>
        );
      case 'pdf':
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <FileIcon size={24} className="text-primary" />
          </div>
        );
      default:
        return (
          <div className="bg-family-lightBlue p-3 rounded-lg flex items-center justify-center">
            <FileIcon size={24} className="text-primary" />
          </div>
        );
    }
  };
  
  // Render file grid item
  const renderGridItem = (file: FileItem) => (
    <div 
      key={file.id}
      className="file-card transition-all cursor-pointer"
      onClick={() => handleFileClick(file)}
    >
      <div className="flex flex-col items-center">
        {file.type === 'image' && file.url ? (
          <div className="w-24 h-24 mb-2 rounded-lg overflow-hidden border border-border">
            <img 
              src={file.url} 
              alt={file.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-2">{renderFileIcon(file.type)}</div>
        )}
        <div className="font-medium text-center truncate w-full">{file.name}</div>
        {file.size !== undefined && (
          <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
        )}
      </div>
    </div>
  );
  
  // Render file list item
  const renderListItem = (file: FileItem) => (
    <div 
      key={file.id}
      className="file-card mb-2 transition-all cursor-pointer"
      onClick={() => handleFileClick(file)}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {file.type === 'image' && file.url ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-border">
              <img 
                src={file.url} 
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
          {file.size !== undefined && file.modified && (
            <div className="text-xs text-muted-foreground">
              {formatFileSize(file.size)} • {file.modified}
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
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {file.type !== 'folder' && (
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Download className="mr-2 h-4 w-4" />
                <span>Scarica</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Share className="mr-2 h-4 w-4" />
              <span>Condividi</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleRenameClick(file, e)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Rinomina</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => handleDeleteClick(file, e)}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Elimina</span>
            </DropdownMenuItem>
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
            <div className="flex items-center text-sm overflow-x-auto whitespace-nowrap pb-2">
              <button 
                className="hover:underline font-medium"
                onClick={() => navigateToPath(-1)}
              >
                Home
              </button>
              
              {pathParts.map((path, index) => (
                <div key={path + index} className="flex items-center">
                  <span className="mx-1 text-muted-foreground">/</span>
                  <button 
                    className={cn(
                      "hover:underline",
                      index === pathParts.length - 1 ? "font-medium" : ""
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
                <Grid size={15} />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setViewMode('list')}
              >
                <List size={15} />
              </Button>
            </div>
          </div>
          
          {/* Search and New Folder */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cerca file e cartelle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setNewFolderDialogOpen(true)}>
              Nuova cartella
            </Button>
          </div>
          
          {/* File list */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p>Caricamento file in corso...</p>
            </div>
          ) : (
            <div className={cn(
              "flex-1 overflow-y-auto",
              viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-2'
            )}>
              {filteredFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Search size={48} className="mb-4 opacity-50" />
                  <p>{searchQuery ? 'Nessun file trovato' : 'Questa cartella è vuota'}</p>
                </div>
              ) : (
                filteredFiles.map((file) => (
                  viewMode === 'grid' ? renderGridItem(file) : renderListItem(file)
                ))
              )}
            </div>
          )}
        </div>
      )}
      
      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crea nuova cartella</DialogTitle>
            <DialogDescription>
              Inserisci il nome per la nuova cartella.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folderName">Nome cartella</Label>
            <Input
              id="folderName"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nuova cartella"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleCreateFolder}>Crea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rinomina elemento</DialogTitle>
            <DialogDescription>
              Inserisci un nuovo nome per {renameItem?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="newName">Nuovo nome</Label>
            <Input
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleRename}>Rinomina</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare {deleteItem?.name}? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Annulla</Button>
            <Button variant="destructive" onClick={handleDelete}>Elimina</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
