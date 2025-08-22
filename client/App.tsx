import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Provider
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Consultation from "./pages/Consultation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// مكون حماية الصفحات التي تتطلب تسجيل دخول
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// مكون توجيه المستخدمين المسجلين بعيداً عن صفحات المصادقة
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// مكون منطق التوجيه
function AppRoutes() {
  return (
    <Routes>
      {/* الصفحات العامة مع Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/faq" element={<Layout><FAQ /></Layout>} />
      <Route path="/consultation" element={<Layout><Consultation /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/legal" element={<Layout><Legal /></Layout>} />

      {/* Service Sub-pages */}
      <Route path="/services/sea" element={<Layout><Services /></Layout>} />
      <Route path="/services/air" element={<Layout><Services /></Layout>} />
      <Route path="/services/land" element={<Layout><Services /></Layout>} />
      <Route path="/services/consultation" element={<Layout><Services /></Layout>} />
      <Route path="/services/free-zones" element={<Layout><Services /></Layout>} />
      <Route path="/services/import-export" element={<Layout><Services /></Layout>} />

      {/* صفحات المصادقة بدون Layout */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* الصفحات المحمية بدون Layout العادي */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 p-6">
            <Dashboard />
          </div>
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 p-6">
            <AdminDashboard />
          </div>
        </ProtectedRoute>
      } />

      {/* 404 Catch-all - MUST be last */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
