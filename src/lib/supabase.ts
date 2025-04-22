
import { supabase as configuredClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Utilizziamo direttamente il client configurato dal file generato automaticamente
export const supabase = configuredClient;

// Helper per verificare il ruolo dell'utente
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('user_roles' as const)
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  return !!data && data.role === 'admin';
};

// Helper per ottenere lo spazio utilizzato dall'utente
export const getUserStorageUsed = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data } = await supabase
    .from('user_storage' as const)
    .select('storage_used')
    .eq('user_id', user.id)
    .maybeSingle();

  return data?.storage_used || 0;
};

// Helper per controllare se l'utente ha spazio sufficiente
export const hasEnoughStorage = async (fileSize: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('user_storage' as const)
    .select('storage_used, storage_limit')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!data) return false;
  return (data.storage_used + fileSize) <= data.storage_limit;
};

