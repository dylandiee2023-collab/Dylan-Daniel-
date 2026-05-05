import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, User, Send, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { appConfig } from '../config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AiAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: `Hello! I am your ${appConfig.appName} AI assistant. How can I help you grow your dropshipping business today? You can ask me about finding winning products, configuring your suppliers, or understanding your financials.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
       chatSessionRef.current = ai.chats.create({
         model: "gemini-3-flash-preview",
         config: {
           systemInstruction: "You are an AI assistant for BiasharaSmart, an advanced dropshipping platform. Help users with managing products, sales, platform configuration, and Dropshipping strategies.",
         }
       });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
        });
      }

      const response = await chatSessionRef.current.sendMessage({ message: userMessage });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error while processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#333333] tracking-tight flex items-center">
            <Sparkles className="w-5 h-5 mr-3 text-[#007BFF]" />
            {appConfig.appName} AI
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Your personal dropshipping expert. Ask for product recommendations, store optimizations, or help with the platform.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col overflow-hidden mb-4 relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-[#007BFF] text-white' : 'bg-white border border-slate-200 text-[#007BFF]'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-[#007BFF] text-white rounded-br-sm' 
                    : 'bg-white border border-slate-100 text-gray-800 shadow-sm rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="flex max-w-[80%] flex-row items-end gap-3">
                 <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-[#007BFF] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="px-4 py-3 rounded-2xl bg-white border border-slate-100 text-gray-800 shadow-sm rounded-bl-sm flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-[#007BFF]" />
                    <span className="ml-2 text-xs text-slate-500 font-medium">AI is thinking...</span>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about dropshipping or the platform..."
              className="w-full bg-[#F9FAFB] border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-2 bg-[#007BFF] hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-3 flex items-center justify-center space-x-4">
             <button onClick={() => setInput("Can you suggest 3 winning products for Q4?")} className="text-[10px] text-slate-500 hover:text-[#007BFF] font-bold uppercase tracking-wider transition-colors">
               💡 Suggest Winning Products
             </button>
             <button onClick={() => setInput("How do I connect my Shopify store?")} className="text-[10px] text-slate-500 hover:text-[#007BFF] font-bold uppercase tracking-wider transition-colors">
               🛠️ Platform Help
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
