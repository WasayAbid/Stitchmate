import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// User Dashboard
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import FabricUpload from "./pages/user/FabricUpload";
import AIDesign from "./pages/user/AIDesign";
import VirtualTryOn from "./pages/user/VirtualTryOn";
import AccessoriesMarketplace from "./pages/user/AccessoriesMarketplace";
import MyOrders from "./pages/user/MyOrders";

// Tailor Dashboard
import TailorLayout from "./layouts/TailorLayout";
import TailorDashboard from "./pages/tailor/TailorDashboard";
import TailorProfile from "./pages/tailor/TailorProfile";
import TailorOrders from "./pages/tailor/TailorOrders";
import TailorShop from "./pages/tailor/TailorShop";
import TailorDelivery from "./pages/tailor/TailorDelivery";
import TailorEarnings from "./pages/tailor/TailorEarnings";

// Admin Dashboard
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="upload" element={<FabricUpload />} />
              <Route path="design" element={<AIDesign />} />
              <Route path="tryon" element={<VirtualTryOn />} />
              <Route path="marketplace" element={<AccessoriesMarketplace />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>

            {/* Tailor Dashboard Routes */}
            <Route path="/tailor" element={<TailorLayout />}>
              <Route index element={<TailorDashboard />} />
              <Route path="profile" element={<TailorProfile />} />
              <Route path="orders" element={<TailorOrders />} />
              <Route path="marketplace" element={<TailorShop />} />
              <Route path="delivery" element={<TailorDelivery />} />
              <Route path="earnings" element={<TailorEarnings />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
