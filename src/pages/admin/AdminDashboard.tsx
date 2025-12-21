import React from 'react';
import { Users, Package, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/AnimatedCard';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,456', icon: Users, color: 'from-primary to-rose', change: '+12%' },
    { label: 'Active Orders', value: '189', icon: Package, color: 'from-gold to-coral', change: '+8%' },
    { label: 'Revenue', value: 'Rs. 5.2M', icon: TrendingUp, color: 'from-mint to-secondary', change: '+23%' },
    { label: 'Products', value: '1,234', icon: ShoppingBag, color: 'from-lavender to-primary', change: '+5%' },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gold/20 via-primary/10 to-mint/20 p-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
        <p className="text-muted-foreground">Welcome to StichMate Admin Panel</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard key={stat.label} hoverEffect="lift" className={`animate-slide-up stagger-${index + 1}`}>
              <AnimatedCardContent className="pt-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <span className="text-xs text-mint">{stat.change}</span>
                </div>
              </AnimatedCardContent>
            </AnimatedCard>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/admin/users">
          <AnimatedCard variant="bordered" hoverEffect="glow" className="cursor-pointer">
            <AnimatedCardContent className="pt-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Manage Users</h3>
                <p className="text-muted-foreground">View and manage all users and tailors</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary" />
            </AnimatedCardContent>
          </AnimatedCard>
        </Link>
        <Link to="/admin/analytics">
          <AnimatedCard variant="bordered" hoverEffect="glow" className="cursor-pointer">
            <AnimatedCardContent className="pt-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">View Analytics</h3>
                <p className="text-muted-foreground">Platform statistics and insights</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary" />
            </AnimatedCardContent>
          </AnimatedCard>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
