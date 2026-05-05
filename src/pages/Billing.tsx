import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, ShieldCheck, Zap } from 'lucide-react';

export default function Billing() {
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    fetch('/api/stripe/getConfig')
      .then((res) => res.json())
      .then((data) => setPublishableKey(data.publishableKey));
  }, []);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('session_id')) {
      setMessage('Subscription processed successfully! Welcome to your new plan.');
    }
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">Subscription & Billing</h2>
      <p className="text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed">
        Manage your BiasharaSmart subscription, upgrade your tier, or view payment history securely via Stripe.
      </p>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-8 border border-green-100 flex items-center shadow-sm">
           <ShieldCheck className="w-5 h-5 mr-3 text-green-500" />
           <p className="text-sm font-bold">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-start relative opacity-70">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Free Starter</h3>
          <p className="text-slate-500 text-xs mb-6 h-10">Perfect for exploring the platform and discovering products.</p>
          <div className="text-3xl font-bold text-gray-900 mb-6">$0<span className="text-sm text-slate-400 font-normal">/mo</span></div>
          
          <ul className="space-y-3 mb-8 w-full">
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> 1 Connected Store</li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> 50 Product Imports</li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Manual Order Sync</li>
          </ul>
          
          <button className="mt-auto w-full py-2.5 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm bg-slate-50 transition-colors" disabled>
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border-2 border-[#007BFF] rounded-2xl p-6 shadow-md flex flex-col items-start relative transform scale-105 z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#007BFF] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Most Popular
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Dropshipper</h3>
          <p className="text-slate-500 text-xs mb-6 h-10">Unlock automation and advanced AI product discovery.</p>
          <div className="text-3xl font-bold text-gray-900 mb-6">$49<span className="text-sm text-slate-400 font-normal">/mo</span></div>
          
          <ul className="space-y-3 mb-8 w-full">
             <li className="flex items-center text-xs text-slate-900"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> <span className="font-bold border-b border-[#007BFF]/30">3 Connected Stores</span></li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Unlimited Product Imports</li>
             <li className="flex items-center text-xs text-slate-900"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> <span className="font-bold border-b border-[#007BFF]/30">Automated Order Sync</span></li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> AI Winning Products Feed</li>
          </ul>
          
          <CheckoutButton priceId="price_pro_placeholder" label="Upgrade to Pro" primary />
        </div>

        {/* Business Plan */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-start relative">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Business Empire</h3>
          <p className="text-slate-500 text-xs mb-6 h-10">For scaling operations and managing multiple brands.</p>
          <div className="text-3xl font-bold text-gray-900 mb-6">$129<span className="text-sm text-slate-400 font-normal">/mo</span></div>
          
          <ul className="space-y-3 mb-8 w-full">
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Unlimited Stores</li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Real-time Price Rules</li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Priority API Support</li>
             <li className="flex items-center text-xs text-slate-600"><Check className="w-4 h-4 text-[#007BFF] mr-2" /> Custom Supplier Webhooks</li>
          </ul>
          
          <CheckoutButton priceId="price_business_placeholder" label="Upgrade to Business" />
        </div>
      </div>
    </div>
  );
}

function CheckoutButton({ priceId, label, primary = false }: { priceId: string, label: string, primary?: boolean }) {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className={`mt-auto w-full py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center ${
        primary 
          ? "bg-[#007BFF] text-white hover:bg-blue-600" 
          : "bg-white border border-slate-200 text-[#007BFF] hover:bg-slate-50"
      }`}
    >
      <Zap className={`w-4 h-4 mr-2 ${primary ? 'text-blue-200' : 'text-[#007BFF]'}`} />
      {label}
    </button>
  );
}
