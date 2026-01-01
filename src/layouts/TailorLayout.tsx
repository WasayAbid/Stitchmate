import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, Settings, Package, ShoppingBag, Truck, DollarSign,
  LogOut, Menu, X, Scissors, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * TailorLayout - Dashboard layout for tailors
 */
const TailorLayout: React.FC = () => {
  const { user, profile, role, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || role !== 'tailor') {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { path: '/tailor', label: 'Overview', icon: Home },
    { path: '/tailor/profile', label: 'My Profile', icon: User },
    { path: '/tailor/orders', label: 'Order Requests', icon: Package },
    { path: '/tailor/marketplace', label: 'My Shop', icon: ShoppingBag },
    { path: '/tailor/delivery', label: 'Deliveries', icon: Truck },
    { path: '/tailor/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/tailor/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-secondary/50 to-sidebar border-r border-sidebar-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/tailor" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint to-secondary flex items-center justify-center shadow-lg">
              <Scissors className="w-5 h-5 text-secondary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-slide-in-right">
                <span className="font-bold text-lg">StichMate</span>
                <p className="text-xs text-muted-foreground">Tailor Portal</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-secondary text-secondary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Scissors className="w-5 h-5 text-secondary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground">Master Tailor</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className={cn("mt-3 text-destructive hover:text-destructive hover:bg-destructive/10", sidebarOpen ? "w-full" : "w-full justify-center")}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TailorLayout;
