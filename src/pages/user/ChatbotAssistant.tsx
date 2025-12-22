import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, ArrowLeft, Bot, User as UserIcon, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/AnimatedCard';
import { useDesign } from '@/contexts/DesignContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatbotAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { fabricAnalysis, selectedDesign, selectedAccessories } = useDesign();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m StichMate AI, your personal fashion assistant. I can help you with fabric choices, design recommendations, styling tips, and accessory suggestions. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    'What fabric goes best with traditional Pakistani wear?',
    'Suggest embroidery patterns for my design',
    'How to style a wedding lehenga?',
    'What accessories match my selected fabric?',
  ];

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulated AI responses based on context
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fabric') && fabricAnalysis) {
      return `Based on your uploaded ${fabricAnalysis.type} fabric in ${fabricAnalysis.color}, I recommend:\n\n✨ **Style Suggestion**: This fabric is perfect for a flowing silhouette like an anarkali or A-line kurta.\n\n🎨 **Color Pairing**: Consider gold or silver embroidery to complement the ${fabricAnalysis.color.toLowerCase()} base.\n\n💎 **Accessories**: Pair with pearl buttons and subtle sequin work for an elegant finish.`;
    }
    
    if (lowerMessage.includes('embroid') || lowerMessage.includes('pattern')) {
      return `For Pakistani traditional wear, here are my top embroidery recommendations:\n\n🌸 **Floral Motifs**: Classic and timeless, perfect for formal occasions\n\n🌿 **Paisley Patterns**: Traditional yet elegant, ideal for weddings\n\n✨ **Zari Work**: Gold and silver thread work adds luxury\n\n💫 **Mirror Work**: Perfect for festive and bridal wear\n\nWould you like me to suggest specific patterns for your selected design?`;
    }
    
    if (lowerMessage.includes('wedding') || lowerMessage.includes('bridal')) {
      return `For a stunning bridal look, consider:\n\n👗 **Outfit**: Heavy lehenga with layered dupatta in rich colors like maroon, red, or emerald green\n\n💎 **Embellishments**: Heavy zari work, kundan, and sequin embroidery\n\n✨ **Accessories**: Statement jhumkas, maang tikka, and matching clutch\n\n🌸 **Fabric**: Velvet, raw silk, or organza with heavy work\n\nWant me to customize these suggestions for your fabric?`;
    }
    
    if (lowerMessage.includes('accessori') && selectedAccessories.length > 0) {
      return `You've selected ${selectedAccessories.length} accessories! Here's how to style them:\n\n${selectedAccessories.map(a => `• **${a.name}**: Perfect for ${a.category === 'embroidery' ? 'neckline and borders' : a.category === 'buttons' ? 'front closure' : 'overall embellishment'}`).join('\n')}\n\n💡 **Tip**: Don't overdo it! Choose 2-3 focal points for a balanced look.`;
    }
    
    return `Great question! Here are my suggestions:\n\n✨ **For Traditional Wear**: Focus on classic silhouettes with modern touches\n\n🎨 **Color Coordination**: Pair your main fabric with contrasting or complementing dupattas\n\n💎 **Embellishment Tips**: Start with subtle embroidery and add more as needed\n\nWould you like more specific advice about your current design project?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center animate-pulse-glow">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            StichMate AI Assistant
          </h1>
          <p className="text-muted-foreground">Your personal fashion advisor</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Window */}
        <AnimatedCard variant="bordered" className="lg:col-span-3">
          <AnimatedCardContent className="h-[600px] flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-fade-scale",
                    message.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === 'assistant' 
                      ? "bg-gradient-to-br from-primary to-gold" 
                      : "bg-muted"
                  )}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <UserIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-4",
                    message.role === 'assistant' 
                      ? "bg-muted" 
                      : "bg-primary text-primary-foreground"
                  )}>
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 animate-fade-scale">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about fashion..."
                  className="flex-1 h-12 px-4 bg-muted border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                <Button type="submit" variant="hero" size="lg" disabled={!input.trim() || isTyping}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Suggestions Sidebar */}
        <div className="space-y-4">
          <AnimatedCard variant="glass" hoverEffect="glow">
            <AnimatedCardContent className="pt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-gold" />
                Quick Suggestions
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 rounded-xl bg-muted hover:bg-primary/10 hover:border-primary border-2 border-transparent transition-all text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          {/* Context Info */}
          {(fabricAnalysis || selectedDesign) && (
            <AnimatedCard variant="bordered">
              <AnimatedCardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Your Current Project
                </h3>
                {fabricAnalysis && (
                  <div className="p-3 bg-muted rounded-xl mb-2">
                    <p className="text-xs text-muted-foreground">Fabric</p>
                    <p className="text-sm font-medium">{fabricAnalysis.type}</p>
                  </div>
                )}
                {selectedDesign && (
                  <div className="p-3 bg-muted rounded-xl">
                    <p className="text-xs text-muted-foreground">Design</p>
                    <p className="text-sm font-medium">{selectedDesign.name}</p>
                  </div>
                )}
              </AnimatedCardContent>
            </AnimatedCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
