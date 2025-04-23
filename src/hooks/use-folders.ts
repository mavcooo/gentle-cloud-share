
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { FileItem } from '@/types/files';

export const useFolders = (currentPath: string = '') => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createFolder = async (folderName: string): Promise<boolean> => {
    if (!user) return false;

    try {
      setLoading(true);
      const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;

      const { error } = await supabase
        .from('folders')
        .insert({
          name: folderName,
          path: newPath,
          parent_path: currentPath || null,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: 'Successo',
        description: 'Cartella creata con successo.',
      });

      return true;
    } catch (error) {
      console.error('Error creating folder:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile creare la cartella.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteFolder = async (folderId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Successo',
        description: 'Cartella eliminata con successo.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare la cartella.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const renameFolder = async (folderId: string, newName: string): Promise<boolean> => {
    if (!user) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('folders')
        .update({ name: newName })
        .eq('id', folderId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Successo',
        description: 'Cartella rinominata con successo.',
      });

      return true;
    } catch (error) {
      console.error('Error renaming folder:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile rinominare la cartella.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createFolder,
    deleteFolder,
    renameFolder
  };
};
