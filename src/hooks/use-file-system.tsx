
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useFileStorage } from './use-file-storage';
import { useFolders } from './use-folders';
import type { FileItem } from '@/types/files';

export const formatFileSize = (bytes?: number) => {
  if (bytes === undefined || bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const useFileSystem = (path = '') => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const fileStorage = useFileStorage();
  const folderManager = useFolders(path);

  const loadFiles = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: folderData, error: folderError } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .eq('parent_path', path || null);

      if (folderError) throw folderError;

      const basePath = user ? `${user.id}/${path}` : '';
      const { data: fileData, error: fileError } = await supabase
        .storage
        .from('user_files')
        .list(basePath);

      if (fileError) throw fileError;

      const mappedFolders = (folderData || []).map((folder): FileItem => ({
        id: folder.id,
        name: folder.name,
        type: 'folder',
        modified: new Date(folder.created_at).toLocaleString(),
        path: folder.path
      }));

      const mappedFiles = (fileData || [])
        .filter((file) => !file.name.endsWith('/'))
        .map((file): FileItem => ({
          id: file.id,
          name: file.name,
          type: getFileType(file.name),
          size: file.metadata?.size,
          modified: new Date(file.created_at || Date.now()).toLocaleString(),
          path: `${basePath}/${file.name}`,
          url: getFileUrl(basePath, file.name)
        }));

      setFolders(mappedFolders);
      setFiles(mappedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare i file.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (basePath: string, fileName: string) => {
    return supabase
      .storage
      .from('user_files')
      .getPublicUrl(`${basePath}/${fileName}`)
      .data
      .publicUrl;
  };

  const getFileType = (fileName: string): FileItem['type'] => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return 'other';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return 'image';
    } else if (ext === 'pdf') {
      return 'pdf';
    } else if (['doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) {
      return 'document';
    }

    return 'other';
  };

  useEffect(() => {
    if (user) {
      loadFiles();
      fileStorage.getStorageInfo();
    }
  }, [user, path]);

  return {
    files: [...folders, ...files],
    loading: loading || fileStorage.loading || folderManager.loading,
    storageUsed: fileStorage.storageUsed,
    storageLimit: fileStorage.storageLimit,
    storagePercentage: fileStorage.storageLimit > 0 ? (fileStorage.storageUsed / fileStorage.storageLimit) * 100 : 0,
    createFolder: folderManager.createFolder,
    uploadFiles: async (files: File[]) => {
      let success = true;
      for (const file of files) {
        const result = await fileStorage.uploadFile(file, path);
        if (!result) success = false;
      }
      if (success) {
        await loadFiles();
        await fileStorage.getStorageInfo();
      }
      return success;
    },
    deleteFile: async (file: FileItem) => {
      let success = false;
      if (file.type === 'folder') {
        success = await folderManager.deleteFolder(file.id);
      } else if (file.path) {
        success = await fileStorage.deleteFile(file.path, file.size);
      }
      if (success) {
        await loadFiles();
        await fileStorage.getStorageInfo();
      }
      return success;
    },
    renameFile: async (file: FileItem, newName: string) => {
      let success = false;
      if (file.type === 'folder') {
        success = await folderManager.renameFolder(file.id, newName);
      } else if (file.path) {
        success = await fileStorage.renameFile(file.path, newName);
      }
      if (success) {
        await loadFiles();
      }
      return success;
    },
    refreshFiles: async () => {
      await loadFiles();
      await fileStorage.getStorageInfo();
    }
  };
};
