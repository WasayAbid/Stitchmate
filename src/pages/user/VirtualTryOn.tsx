import React, { useState } from 'react';
import { Shirt, Upload, Move, RotateCw, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import dressPreview from '@/assets/dress-preview.png';

/**
 * VirtualTryOn - Page for trying on generated designs virtually
 */
const VirtualTryOn: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);

  const dresses = [
    { id: 1, name: 'Traditional Kameez', image: dressPreview },
    { id: 2, name: 'Modern Gown', image: dressPreview },
    { id: 3, name: 'Bridal Lehenga', image: dressPreview },
  ];

  const handleTryOn = async () => {
    if (!userImage) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTryOnResult(dressPreview);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shirt className="w-8 h-8 text-lavender" />
          Virtual Try-On
        </h1>
        <p className="text-muted-foreground">See how designs look on you before ordering</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* User Photo Upload */}
        <AnimatedCard variant="bordered">
          <AnimatedCardHeader>
            <AnimatedCardTitle>Your Photo</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            {userImage ? (
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={userImage}
                  alt="Your photo"
                  className="w-full h-64 object-cover"
                />
                <Button
                  variant="glass"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => setUserImage(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-10 h-10 text-muted-foreground mb-3 animate-bounce-soft" />
                <p className="font-medium">Upload your photo</p>
                <p className="text-sm text-muted-foreground">For best results, use a full-body photo</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setUserImage(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Dress Selection */}
        <AnimatedCard variant="bordered">
          <AnimatedCardHeader>
            <AnimatedCardTitle>Select Design</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <div className="space-y-3">
              {dresses.map((dress, index) => (
                <button
                  key={dress.id}
                  onClick={() => setSelectedDress(index)}
                  className={`
                    w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-300
                    ${selectedDress === index
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{dress.name}</p>
                    <p className="text-sm text-muted-foreground">AI Generated</p>
                  </div>
                  {selectedDress === index && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-4"
              onClick={handleTryOn}
              disabled={!userImage || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Try On Design'}
            </Button>
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Result */}
        <AnimatedCard variant="glass" hoverEffect="glow">
          <AnimatedCardHeader>
            <AnimatedCardTitle>Try-On Result</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            {tryOnResult ? (
              <div className="space-y-4 animate-fade-scale">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={tryOnResult}
                    alt="Try-on result"
                    className="w-full h-64 object-cover"
                  />
                </div>
                {/* Controls */}
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="icon">
                    <Move className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="gold" size="lg" className="w-full">
                  Order This Design
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Shirt className="w-16 h-16 text-muted-foreground mb-4 animate-float" />
                <p className="text-muted-foreground">
                  Upload your photo and select a design to see the virtual try-on
                </p>
              </div>
            )}
          </AnimatedCardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default VirtualTryOn;
