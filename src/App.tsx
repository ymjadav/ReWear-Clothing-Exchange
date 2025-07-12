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
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth"; // Adjust the import based on your project structure
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log("Is Authenticated:", isAuthenticated); // Example hook
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ItemDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-item"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Redirect root to login if not authenticated */}
            <Route path="/" element={<Index />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
