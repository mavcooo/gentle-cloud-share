
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper per verificare il ruolo dell'utente
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  return data?.role === 'admin';
};

// Helper per ottenere lo spazio utilizzato dall'utente
export const getUserStorageUsed = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;
  
  const { data } = await supabase
    .from('user_storage')
    .select('storage_used')
    .eq('user_id', user.id)
    .single();
  
  return data?.storage_used || 0;
};

// Helper per controllare se l'utente ha spazio sufficiente
export const hasEnoughStorage = async (fileSize: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data } = await supabase
    .from('user_storage')
    .select('storage_used, storage_limit')
    .eq('user_id', user.id)
    .single();
  
  if (!data) return false;
  
  return (data.storage_used + fileSize) <= data.storage_limit;
};
