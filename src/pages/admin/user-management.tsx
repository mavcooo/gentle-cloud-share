
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Sidebar } from '@/components/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/lib/supabase';
import { formatFileSize } from '@/hooks/use-file-system';
import { User, Search, Trash, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from '@/components/ui/card';
import { useAuthGuard } from '@/hooks/use-auth-guard';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  storage_used: number;
  storage_limit: number;
  created_at: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editStorageDialog, setEditStorageDialog] = useState(false);
  const [newStorageLimit, setNewStorageLimit] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Proteggi la rotta per admin
  useAuthGuard(true);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    setLoading(true);
    try {
      // Questa sarebbe una chiamata a Supabase per ottenere tutti gli utenti con le loro info
      // Simuliamo una risposta mock per ora
      const mockUsers: UserData[] = [
        {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          storage_used: 2.5 * 1024 * 1024 * 1024,
          storage_limit: 10 * 1024 * 1024 * 1024,
          created_at: '2023-01-15'
        },
        {
          id: '2',
          email: 'user1@example.com',
          name: 'Mario Rossi',
          role: 'user',
          storage_used: 3.2 * 1024 * 1024 * 1024,
          storage_limit: 5 * 1024 * 1024 * 1024,
          created_at: '2023-02-20'
        },
        {
          id: '3',
          email: 'user2@example.com',
          name: 'Giulia Bianchi',
          role: 'user',
          storage_used: 1.7 * 1024 * 1024 * 1024,
          storage_limit: 5 * 1024 * 1024 * 1024,
          created_at: '2023-03-10'
        },
        {
          id: '4',
          email: 'user3@example.com',
          name: 'Paolo Verdi',
          role: 'user',
          storage_used: 0.8 * 1024 * 1024 * 1024,
          storage_limit: 5 * 1024 * 1024 * 1024,
          created_at: '2023-04-05'
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Errore caricamento utenti:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare gli utenti.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleEditStorage = (user: UserData) => {
    setSelectedUser(user);
    setNewStorageLimit((user.storage_limit / (1024 * 1024 * 1024)).toString());
    setEditStorageDialog(true);
  };
  
  const saveStorageLimit = async () => {
    if (!selectedUser) return;
    
    try {
      const newLimit = parseFloat(newStorageLimit) * 1024 * 1024 * 1024;
      if (isNaN(newLimit) || newLimit <= 0) {
        throw new Error('Valore non valido');
      }
      
      // Chiama l'API per aggiornare il limite di spazio
      // Qui dovremmo usare Supabase per aggiornare il record
      
      toast({
        title: 'Limite aggiornato',
        description: `Il limite di spazio per ${selectedUser.name} è stato aggiornato a ${newStorageLimit} GB.`
      });
      
      // Aggiorna la lista locale
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, storage_limit: newLimit } 
          : user
      ));
      
      setEditStorageDialog(false);
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile aggiornare il limite di spazio.',
        variant: 'destructive'
      });
      console.error(error);
    }
  };
  
  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setDeleteDialog(true);
  };
  
  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      // Chiama l'API per eliminare l'utente
      // Qui dovremmo usare Supabase per eliminare il record e tutti i file associati
      
      toast({
        title: 'Utente eliminato',
        description: `L'utente ${selectedUser.name} è stato eliminato.`
      });
      
      // Aggiorna la lista locale
      setUsers(users.filter(user => user.id !== selectedUser.id));
      
      setDeleteDialog(false);
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare l\'utente.',
        variant: 'destructive'
      });
      console.error(error);
    }
  };
  
  const filteredUsers = searchQuery
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;
  
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 p-4 md:p-6 transition-all overflow-hidden ${isMobile ? 'ml-0' : ''}`}>
        {isMobile && !sidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mb-4" 
            onClick={toggleSidebar}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gestione Utenti</h1>
          <p className="text-muted-foreground">Gestisci gli utenti e i limiti di storage</p>
        </div>
        
        <Card className="mb-6 p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cerca utenti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              Aggiungi Utente
            </Button>
          </div>
        </Card>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <p>Caricamento utenti...</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utente</TableHead>
                  <TableHead>Ruolo</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Data registrazione</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nessun utente trovato
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-family-lightBlue p-2 rounded-full">
                            <User size={18} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {user.role === 'admin' ? 'Amministratore' : 'Utente'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>{formatFileSize(user.storage_used)}</span>
                            <span>{formatFileSize(user.storage_limit)}</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${(user.storage_used / user.storage_limit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Azioni
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Azioni utente</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditStorage(user)}>
                              <Edit size={16} className="mr-2" />
                              Modifica spazio
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={16} className="mr-2" />
                              Modifica ruolo
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash size={16} className="mr-2" />
                              Elimina utente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      
      {/* Dialog per modificare il limite di storage */}
      <Dialog open={editStorageDialog} onOpenChange={setEditStorageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica limite di storage</DialogTitle>
            <DialogDescription>
              Imposta un nuovo limite di storage per {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <label htmlFor="storageLimit" className="text-sm font-medium block mb-2">
              Limite di storage (GB)
            </label>
            <Input
              id="storageLimit"
              type="number"
              value={newStorageLimit}
              onChange={(e) => setNewStorageLimit(e.target.value)}
              min="1"
              step="1"
            />
            <p className="text-xs text-muted-foreground mt-2">
              L'utente sta attualmente utilizzando {selectedUser ? formatFileSize(selectedUser.storage_used) : '0 B'}.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStorageDialog(false)}>Annulla</Button>
            <Button onClick={saveStorageLimit}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog per confermare l'eliminazione */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare l'utente {selectedUser?.name}? 
              Questa azione eliminerà anche tutti i file e le cartelle dell'utente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>Annulla</Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>Elimina</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementPage;
