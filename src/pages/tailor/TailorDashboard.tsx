import React from 'react';
import { Link } from 'react-router-dom';
import { Package, DollarSign, Star, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { useAuth } from '@/contexts/AuthContext';

/**
 * TailorDashboard - Main overview page for tailors
 */
const TailorDashboard: React.FC = () => {
  const { user, profile } = useAuth();

  const stats = [
    { label: 'Pending Orders', value: 12, icon: Package, color: 'from-primary to-rose', trend: '+3' },
    { label: 'This Month', value: 'Rs. 45,000', icon: DollarSign, color: 'from-gold to-coral', trend: '+12%' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'from-mint to-secondary', trend: '+0.2' },
    { label: 'Completed', value: 156, icon: TrendingUp, color: 'from-lavender to-primary', trend: '+8' },
  ];

  const pendingOrders = [
    { id: 'ORD-101', customer: 'Sarah Ahmed', item: 'Bridal Lehenga', dueDate: '28 Dec', priority: 'high' },
    { id: 'ORD-102', customer: 'Fatima Khan', item: 'Silk Kameez', dueDate: '30 Dec', priority: 'medium' },
    { id: 'ORD-103', customer: 'Ayesha Ali', item: 'Party Gown', dueDate: '2 Jan', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-destructive/20 text-destructive',
      medium: 'bg-gold/20 text-gold',
      low: 'bg-mint/20 text-mint',
    };
    return colors[priority] || 'bg-muted';
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary/30 via-mint/20 to-gold/20 p-8">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Hello, <span className="text-gradient">{profile?.full_name || 'Master Tailor'}</span>! 🧵
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            You have <span className="font-semibold text-primary">12 pending orders</span> to work on today
          </p>
          <Link to="/tailor/orders">
            <Button variant="mint" size="lg">
              View All Orders
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard
              key={stat.label}
              hoverEffect="lift"
              className={`animate-slide-up stagger-${index + 1}`}
            >
              <AnimatedCardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-mint bg-mint/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedCardContent>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Pending Orders */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader className="flex flex-row items-center justify-between">
          <AnimatedCardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            Pending Orders
          </AnimatedCardTitle>
          <Link to="/tailor/orders">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Package className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                  <span className="text-sm text-muted-foreground">{order.dueDate}</span>
                  <Button variant="outline" size="sm">
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default TailorDashboard;
