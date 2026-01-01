import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Palette, Shirt, ShoppingBag, Package, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { useAuth } from '@/contexts/AuthContext';
import heroBanner from '@/assets/hero-banner.png';

/**
 * UserDashboard - Main overview page for users
 */
const UserDashboard: React.FC = () => {
  const { user, profile } = useAuth();

  const features = [
    {
      icon: Upload,
      title: 'Upload Fabric',
      description: 'Scan and analyze your fabric with AI',
      path: '/dashboard/upload',
      color: 'from-primary to-rose',
    },
    {
      icon: Palette,
      title: 'AI Design',
      description: 'Create stunning dress designs',
      path: '/dashboard/design',
      color: 'from-mint to-secondary',
    },
    {
      icon: Shirt,
      title: 'Virtual Try-On',
      description: 'See how designs look on you',
      path: '/dashboard/tryon',
      color: 'from-lavender to-primary',
    },
    {
      icon: ShoppingBag,
      title: 'Accessories',
      description: 'Browse buttons, embroidery & more',
      path: '/dashboard/marketplace',
      color: 'from-gold to-coral',
    },
  ];

  const recentOrders = [
    { id: 'ORD001', item: 'Embroidered Kameez', status: 'In Progress', progress: 60 },
    { id: 'ORD002', item: 'Wedding Lehenga', status: 'Cutting', progress: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-mint/20 to-gold/20 p-8">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{profile?.full_name || user?.email?.split('@')[0]}</span>! ✨
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Ready to create something beautiful today?
          </p>
          <Link to="/dashboard/upload">
            <Button variant="hero" size="lg">
              <Sparkles className="w-5 h-5" />
              Start Designing
            </Button>
          </Link>
        </div>
        <img
          src={heroBanner}
          alt="Fashion elements"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30 lg:opacity-50"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.path} to={feature.path}>
                <AnimatedCard
                  hoverEffect="lift"
                  className={`h-full cursor-pointer animate-slide-up stagger-${index + 1}`}
                >
                  <AnimatedCardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <ArrowRight className="w-4 h-4 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </AnimatedCardContent>
                </AnimatedCard>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link to="/dashboard/orders">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <AnimatedCard key={order.id} variant="bordered" hoverEffect="glow" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-mint">{order.status}</span>
                  <div className="w-24 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-mint rounded-full transition-all duration-500"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
