
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardPage from "./pages/dashboard";
import SharedPage from "./pages/shared";
import RecentPage from "./pages/recent";
import PhotosPage from "./pages/photos";
import SettingsPage from "./pages/settings";
import NotFound from "./pages/NotFound";
import UserManagementPage from "./pages/admin/user-management";
import ProtectedRoute from "./components/protected-route";
import AdminRoute from "./components/admin-route";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rotte protette (richiedono autenticazione) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/shared" element={
              <ProtectedRoute>
                <SharedPage />
              </ProtectedRoute>
            } />
            <Route path="/recent" element={
              <ProtectedRoute>
                <RecentPage />
              </ProtectedRoute>
            } />
            <Route path="/photos" element={
              <ProtectedRoute>
                <PhotosPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Rotte protette (richiedono ruolo admin) */}
            <Route path="/admin/users" element={
              <AdminRoute>
                <UserManagementPage />
              </AdminRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
