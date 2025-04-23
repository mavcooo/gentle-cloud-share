
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { FileItem } from '@/types/files';

export const useFileStorage = () => {
  const [loading, setLoading] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const checkStorageLimit = async (fileSize: number): Promise<boolean> => {
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_storage')
      .select('storage_used, storage_limit')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error checking storage limit:', error);
      return false;
    }

    if (!data) return false;
    return (data.storage_used + fileSize) <= data.storage_limit;
  };

  const uploadFile = async (file: File, path: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      const hasSpace = await checkStorageLimit(file.size);
      
      if (!hasSpace) {
        toast({
          title: 'Spazio insufficiente',
          description: 'Non hai abbastanza spazio per caricare questo file.',
          variant: 'destructive'
        });
        return false;
      }

      const filePath = path ? `${path}/${file.name}` : file.name;
      const { error: uploadError } = await supabase
        .storage
        .from('user_files')
        .upload(`${user.id}/${filePath}`, file);

      if (uploadError) throw uploadError;

      // Update storage used
      await supabase.rpc('increment_storage_used', {
        user_id_param: user.id,
        bytes_used: file.size
      });

      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare il file.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (filePath: string, fileSize?: number): Promise<boolean> => {
    if (!user) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .storage
        .from('user_files')
        .remove([`${user.id}/${filePath}`]);

      if (error) throw error;

      if (fileSize) {
        await supabase.rpc('decrement_storage_used', {
          user_id_param: user.id,
          bytes_used: fileSize
        });
      }

      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare il file.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    storageUsed,
    storageLimit,
    uploadFile,
    deleteFile,
    checkStorageLimit
  };
};
