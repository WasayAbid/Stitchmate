import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Scissors, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingElements } from '@/components/ui/FloatingElements';
import heroBanner from '@/assets/hero-banner.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />
      
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-gradient">StichMate</span>
        </div>
        <Link to="/auth">
          <Button variant="hero">Get Started</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Your Fashion
              <span className="text-gradient block">Design Playground</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Upload fabrics, create AI-powered designs, try them virtually, and connect with master tailors. Pakistani fashion meets modern technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  <Sparkles className="w-5 h-5" />
                  Start Designing
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-scale">
            <img 
              src={heroBanner} 
              alt="Fashion design elements" 
              className="w-full rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/30 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 lg:px-12 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'AI Design', desc: 'Upload fabric and let AI create stunning designs' },
              { icon: Scissors, title: 'Expert Tailors', desc: 'Connect with skilled Pakistani tailors' },
              { icon: Users, title: 'Virtual Try-On', desc: 'See designs on yourself before ordering' },
            ].map((feature, i) => (
              <div key={i} className={`text-center p-6 rounded-2xl bg-card border border-border hover:shadow-xl transition-all animate-slide-up stagger-${i + 1}`}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-gold flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-gold fill-gold" />)}
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of fashion enthusiasts and tailors on StichMate</p>
          <Link to="/auth">
            <Button variant="hero" size="xl">
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
