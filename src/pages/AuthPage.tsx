import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, User, Scissors, Shield } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { FloatingElements, ConfettiEffect } from '@/components/ui/FloatingElements';
import { cn } from '@/lib/utils';
import fabricPattern from '@/assets/fabric-pattern.png';

/**
 * AuthPage - Login/Signup page with role selection
 * Features animated form fields, role tabs with glow effects, and confetti on success
 */
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const roles: { id: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'user', label: 'User', icon: <User className="w-5 h-5" />, description: 'Design & Order' },
    { id: 'tailor', label: 'Tailor', icon: <Scissors className="w-5 h-5" />, description: 'Create & Sell' },
    { id: 'admin', label: 'Admin', icon: <Shield className="w-5 h-5" />, description: 'Manage All' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      if (isLogin) {
        success = await login(formData.email, formData.password, selectedRole);
      } else {
        success = await signup(formData.name, formData.email, formData.password, selectedRole);
      }

      if (success) {
        setShowConfetti(true);
        setTimeout(() => {
          const dashboardRoutes = {
            user: '/dashboard',
            tailor: '/tailor',
            admin: '/admin',
          };
          navigate(dashboardRoutes[selectedRole]);
        }, 1500);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted to-background pattern-embroidery relative overflow-hidden">
      <FloatingElements />
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Decorative fabric image */}
      <img 
        src={fabricPattern} 
        alt="" 
        className="absolute top-10 right-10 w-32 h-32 opacity-30 animate-float pointer-events-none"
      />
      <img 
        src={fabricPattern} 
        alt="" 
        className="absolute bottom-20 left-10 w-24 h-24 opacity-20 animate-float-delayed pointer-events-none rotate-45"
      />

      {/* Main Card */}
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl animate-fade-scale relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold mb-4 shadow-lg animate-bounce-soft">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">StichMate</h1>
          <p className="text-muted-foreground">Your Fashion Design Playground</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-muted rounded-2xl">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-300",
                selectedRole === role.id
                  ? "bg-card shadow-lg shadow-primary/20 animate-pulse-glow"
                  : "hover:bg-card/50"
              )}
            >
              <span className={cn(
                "transition-colors duration-300",
                selectedRole === role.id ? "text-primary" : "text-muted-foreground"
              )}>
                {role.icon}
              </span>
              <span className={cn(
                "text-sm font-medium",
                selectedRole === role.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {role.label}
              </span>
              <span className="text-[10px] text-muted-foreground">{role.description}</span>
            </button>
          ))}
        </div>

        {/* Login/Signup Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={cn(
              "flex-1 py-2 text-sm font-medium transition-all duration-300 border-b-2",
              isLogin
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={cn(
              "flex-1 py-2 text-sm font-medium transition-all duration-300 border-b-2",
              !isLogin
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="animate-slide-up">
              <AnimatedInput
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
              />
            </div>
          )}

          <AnimatedInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="relative">
            <AnimatedInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors hover-wiggle"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isLogin ? 'Sign In' : 'Create Account'}
              </span>
            )}
          </Button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
