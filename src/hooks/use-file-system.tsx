
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { Database } from '@/integrations/supabase/types';

export type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'pdf' | 'other';
  size?: number;
  modified?: string;
  path?: string;
  url?: string;
};

export const useFileSystem = (path = '') => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const basePath = user ? `${user.id}/${path}` : '';

  const loadFiles = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Carica cartelle (sono memorizzate in una tabella separata)
      const { data: folderData, error: folderError } = await supabase
        .from('folders' as const)
        .select('*')
        .eq('user_id', user.id)
        .eq('parent_path', path || null);

      if (folderError) throw folderError;

      // Carica file
      const { data: fileData, error: fileError } = await supabase
        .storage
        .from('user_files')
        .list(basePath);

      if (fileError) throw fileError;

      // Carica informazioni sull'utilizzo dello storage
      const { data: storageData, error: storageError } = await supabase
        .from('user_storage' as const)
        .select('storage_used, storage_limit')
        .eq('user_id', user.id)
        .maybeSingle();

      if (storageError && storageError.code !== 'PGRST116') throw storageError;

      // Mappa le cartelle al formato FileItem
      const mappedFolders = (folderData || []).map((folder: Database['public']['Tables']['folders']['Row']): FileItem => ({
        id: folder.id,
        name: folder.name,
        type: 'folder',
        modified: new Date(folder.created_at).toLocaleString(),
        path: folder.path
      }));

      // Mappa i file al formato FileItem
      const mappedFiles = (fileData || [])
        .filter((file) => !file.name.endsWith('/')) // Escludi le cartelle
        .map((file): FileItem => {
          const fileType = getFileType(file.name);
          return {
            id: file.id,
            name: file.name,
            type: fileType,
            size: file.metadata?.size,
            modified: new Date(file.created_at || Date.now()).toLocaleString(),
            path: `${basePath}/${file.name}`,
            url: getFileUrl(basePath, file.name)
          };
        });

      setFolders(mappedFolders);
      setFiles(mappedFiles);
      setStorageUsed(storageData?.storage_used || 0);
      setStorageLimit(storageData?.storage_limit || 10 * 1024 * 1024 * 1024); // Default 10GB
    } catch (error) {
      console.error('Errore caricamento file:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare i file.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async (folderName: string) => {
    if (!user) return null;

    try {
      // Crea la nuova cartella nel database
      const newPath = path ? `${path}/${folderName}` : folderName;

      const { data, error } = await supabase
        .from('folders' as const)
        .insert({
          name: folderName,
          path: newPath,
          parent_path: path || null,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      // Crea anche una cartella vuota nello storage
      const { error: storageError } = await supabase
        .storage
        .from('user_files')
        .upload(`${user.id}/${newPath}/.folder`, new Blob(['']));

      if (storageError) throw storageError;

      toast({
        title: 'Successo',
        description: 'Cartella creata con successo.',
      });

      await loadFiles();
      return data;
    } catch (error) {
      console.error('Errore creazione cartella:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile creare la cartella.',
        variant: 'destructive'
      });
      return null;
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (!user) return;

    // Verifica spazio disponibile
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (storageUsed + totalSize > storageLimit) {
      toast({
        title: 'Spazio insufficiente',
        description: 'Non hai abbastanza spazio per caricare questi file.',
        variant: 'destructive'
      });
      return;
    }

    const uploadPromises = files.map(async (file) => {
      try {
        const filePath = path ? `${path}/${file.name}` : file.name;
        const { error } = await supabase
          .storage
          .from('user_files')
          .upload(`${user.id}/${filePath}`, file);

        if (error) throw error;

        // Aggiorna lo spazio utilizzato
        await supabase.rpc('increment_storage_used', {
          user_id_param: user.id,
          bytes_used: file.size
        });

        return { success: true, name: file.name };
      } catch (error) {
        console.error(`Errore upload file ${file.name}:`, error);
        return { success: false, name: file.name, error };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successes = results.filter(r => r.success);
    const failures = results.filter(r => !r.success);

    if (successes.length > 0) {
      toast({
        title: 'Upload completato',
        description: `${successes.length} file caricati con successo.`,
      });

      // Ricarica la lista dei file
      await loadFiles();
    }

    if (failures.length > 0) {
      toast({
        title: 'Errore upload',
        description: `${failures.length} file non sono stati caricati.`,
        variant: 'destructive'
      });
    }
  };

  const deleteFile = async (file: FileItem) => {
    if (!user) return;

    try {
      if (file.type === 'folder') {
        // Elimina la cartella dal database
        const { error } = await supabase
          .from('folders' as const)
          .delete()
          .eq('id', file.id);

        if (error) throw error;

        // Elimina tutti i file nella cartella dallo storage
        // Nota: questo è un semplificato, un'implementazione reale dovrebbe gestire le sottocartelle in modo ricorsivo
        const { error: storageError } = await supabase
          .storage
          .from('user_files')
          .remove([`${user.id}/${file.path}/.folder`]);

        if (storageError) throw storageError;
      } else {
        // Ottieni la dimensione del file prima di eliminarlo
        const filePath = file.path;
        if (!filePath) throw new Error('Percorso file mancante');

        // Elimina il file
        const { error } = await supabase
          .storage
          .from('user_files')
          .remove([filePath]);

        if (error) throw error;

        // Aggiorna lo spazio utilizzato
        if (file.size) {
          await supabase.rpc('decrement_storage_used', {
            user_id_param: user.id,
            bytes_used: file.size
          });
        }
      }

      toast({
        title: 'Eliminato',
        description: `${file.name} è stato eliminato.`,
      });

      await loadFiles();
    } catch (error) {
      console.error('Errore eliminazione:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare il file.',
        variant: 'destructive'
      });
    }
  };

  const renameFile = async (file: FileItem, newName: string) => {
    if (!user) return;

    try {
      if (file.type === 'folder') {
        // Rinomina la cartella nel database
        const { error } = await supabase
          .from('folders' as const)
          .update({ name: newName })
          .eq('id', file.id);

        if (error) throw error;
      } else {
        // Per i file, dobbiamo caricare una copia con il nuovo nome e poi eliminare l'originale
        const filePath = file.path;
        if (!filePath) throw new Error('Percorso file mancante');

        // Ottieni il contenuto del file
        const { data, error } = await supabase
          .storage
          .from('user_files')
          .download(filePath);

        if (error) throw error;

        // Ottieni il percorso della directory
        const dirPath = path ? `${user.id}/${path}/` : `${user.id}/`;

        // Carica il file con il nuovo nome
        const { error: uploadError } = await supabase
          .storage
          .from('user_files')
          .upload(`${dirPath}${newName}`, data);

        if (uploadError) throw uploadError;

        // Elimina il file originale
        const { error: deleteError } = await supabase
          .storage
          .from('user_files')
          .remove([filePath]);

        if (deleteError) throw deleteError;
      }

      toast({
        title: 'Rinominato',
        description: `File rinominato con successo.`,
      });

      await loadFiles();
    } catch (error) {
      console.error('Errore rinomina:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile rinominare il file.',
        variant: 'destructive'
      });
    }
  };

  // Helper per ottenere l'URL di un file
  const getFileUrl = (basePath: string, fileName: string) => {
    return supabase
      .storage
      .from('user_files')
      .getPublicUrl(`${basePath}/${fileName}`)
      .data
      .publicUrl;
  };

  // Helper per determinare il tipo di file
  const getFileType = (fileName: string) => {
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
    }
  }, [user, path]);

  return {
    files: [...folders, ...files],
    loading,
    storageUsed,
    storageLimit,
    storagePercentage: storageLimit > 0 ? (storageUsed / storageLimit) * 100 : 0,
    createFolder,
    uploadFiles,
    deleteFile,
    renameFile,
    refreshFiles: loadFiles,
  };
};

// Helper per formattare la dimensione dei file
export const formatFileSize = (bytes?: number) => {
  if (bytes === undefined || bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
