import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import { AuthHandler } from "./pages/AuthHaldler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected routes */}
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <AuthHandler>
                <Dashboard />
              </AuthHandler>
            }
          />
          <Route
            path="/item/:id"
            element={
              <AuthHandler>
                <ItemDetail />
              </AuthHandler>
            }
          />
          <Route
            path="/add-item"
            element={
              <AuthHandler>
                <AddItem />
              </AuthHandler>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthHandler>
                <AdminPanel />
              </AuthHandler>
            }
          />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
