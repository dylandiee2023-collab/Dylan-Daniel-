import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Link2,
  Zap,
  Smartphone,
  Layers,
  Search,
  Package,
  TrendingUp,
  CreditCard,
  Truck,
  ArrowRight,
  Monitor,
  HeartHandshake,
  Database,
  Globe,
  Settings,
  Activity,
  Box,
  RefreshCw,
  Bell,
  Palette,
  FileText,
  Bot,
  Moon,
  Sun
} from 'lucide-react';
import Billing from './pages/Billing';
import SupplierHub from './pages/SupplierHub';

import AiAssistant from './pages/AiAssistant';

import { appConfig } from './config';

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Add Google Translate Script for all languages support implicitly based on browser lang
    const userLang = navigator.language.split('-')[0];
    if (userLang !== 'en') {
      const cookieString = `/en/${userLang}`;
      document.cookie = `googtrans=${cookieString}; path=/`;
      document.cookie = `googtrans=${cookieString}; domain=.${window.location.hostname}; path=/`;
    }

    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      document.body.appendChild(addScript);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };
    }
  }, []);

  const tabs = [
    { path: '/', label: 'Executive Summary', icon: LayoutDashboard },
    { path: '/core', label: 'Core Functionality', icon: ShoppingCart },
    { path: '/hub', label: 'Supplier Hub', icon: Package },
    { path: '/ai', label: 'AI Assistant', icon: Bot },
    { path: '/billing', label: 'Billing & Stripe', icon: CreditCard },
    { path: '/admin', label: 'Admin Panel', icon: Users },
    { path: '/apis', label: 'APIs & Integrations', icon: Link2 },
    { path: '/automation', label: 'Automation Engine', icon: Zap },
    { path: '/uiux', label: 'UI/UX Design', icon: Palette },
    { path: '/tech', label: 'Technology Stack', icon: Layers },
  ] as const;

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-[#1a202c]' : 'bg-[#FFFFFF]'} text-[#333333] font-sans selection:bg-[#007BFF] selection:text-white`}>
      <style>{`
        /* Hide Google Translate top bar & element */
        body { top: 0 !important; }
        .skiptranslate iframe, .goog-te-banner-frame { display: none !important; }
        #google_translate_element { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        /* Prevent font changes when hovering translated text */
        font { background-color: transparent !important; }
      `}</style>
      {theme === 'dark' && (
        <style>{`
          .bg-\\[\\#F9FAFB\\], .bg-white, .bg-slate-50, main, header, .bg-slate-50 {
            background-color: #1a202c !important;
            border-color: #2d3748 !important;
          }
          .text-\\[\\#333333\\], .text-gray-900, .text-slate-800 {
            color: #f7fafc !important;
          }
          .text-slate-600, .text-slate-500, .text-slate-400 {
            color: #cbd5e0 !important;
          }
          .bg-\\[\\#007BFF\\] {
            background-color: #2b6cb0 !important;
          }
          .bg-slate-100, .border-slate-100 {
            background-color: #2d3748 !important;
            border-color: #4a5568 !important;
          }
        `}</style>
      )}
      {/* Sidebar */}
      <aside className="w-64 bg-[#007BFF] flex flex-col z-10">
        <div className="p-6 flex items-center gap-3">
          {appConfig.logoUrl ? (
            <img src={appConfig.logoUrl} alt={appConfig.appName} className="w-10 h-10 rounded-lg object-contain bg-white shrink-0" />
          ) : (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
              <div className="w-6 h-6 border-4 border-[#007BFF] rounded-sm"></div>
            </div>
          )}
          <span className="text-xl font-bold tracking-tight text-white truncate" title={appConfig.appName}>{appConfig.appName}</span>
        </div>
        
        <div className="px-6 py-2">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Project Blueprint</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 gap-3 ${
                  isActive
                    ? 'bg-white/20 text-white font-bold shadow-sm'
                    : 'text-white/70 hover:bg-white/10 font-bold'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="bg-white p-4 rounded-xl shadow-lg relative overflow-hidden">
            <p className="text-[10px] uppercase font-bold text-[#007BFF] mb-1">Status</p>
            <p className="text-sm font-bold text-gray-900">Planning Phase</p>
            <div className="mt-2 w-full bg-slate-100 h-1 rounded-full">
              <div className="bg-[#007BFF] h-1 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">v1.0 Blueprint</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#F9FAFB] flex flex-col">
          <header className={`border-b px-8 py-4 flex justify-between items-center shrink-0 sticky top-0 z-20 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
             <div>
                {/* Optional Top Bar Breadcrumbs */}
             </div>
             <div className="flex items-center space-x-4">
                <div id="google_translate_element" style={{ display: 'none' }}></div>
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`relative p-2 rounded-full transition ${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-[#007BFF] hover:bg-blue-50'}`}
                >
                   {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className={`relative p-2 rounded-full transition ${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-[#007BFF] hover:bg-blue-50'}`}>
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
             </div>
          </header>
          <div className="max-w-5xl mx-auto w-full p-8 lg:p-12">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/core" element={<CoreFunctionality />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/ai" element={<AiAssistant />} />
              <Route path="/apis" element={<ApisIntegrations />} />
              <Route path="/automation" element={<AutomationEngine />} />
              <Route path="/uiux" element={<UiUxDesign />} />
              <Route path="/tech" element={<TechStack />} />
              <Route path="/hub" element={<SupplierHub />} />
            </Routes>
          </div>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">BiasharaSmart Project Blueprint</h1>
      <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-3xl">
        A modern, mobile-first dropshipping application inspired by Tradelle, tailored for a global audience with a focus on simplicity, power, and automation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-blue-50 text-[#007BFF] rounded-xl flex items-center justify-center mb-5">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Global Audience Focus</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Built from the ground up to support international dropshippers with multi-currency support, global supplier networks, and scalable infrastructure.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center mb-5">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Automation First</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Eliminating manual work through smart automation: order fulfillment, inventory syncing, and tracking updates happen synchronously in the background.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 p-6 flex items-center gap-2">
          <span className="p-1.5 bg-blue-100 text-[#007BFF] rounded-lg">
             <LayoutDashboard className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-bold text-gray-900">Project Goals & Vision</h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-start">
             <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-[#007BFF] font-bold text-xs uppercase">01</span>
             </div>
             <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Democratize E-Commerce</h4>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">Provide a platform that lowers the barrier to entry for aspiring entrepreneurs by abstracting away the complex logistics of dropshipping.</p>
             </div>
          </div>
          <div className="flex items-start">
             <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-[#007BFF] font-bold text-xs uppercase">02</span>
             </div>
             <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Simplicity meets Power</h4>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">Deliver enterprise-grade automation features wrapped in an incredibly intuitive user interface that feels welcoming to beginners.</p>
             </div>
          </div>
          <div className="flex items-start">
             <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-[#007BFF] font-bold text-xs uppercase">03</span>
             </div>
             <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Centralized Command Center</h4>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">Act as the single source of truth for product discovery, store management, and financial analytics.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoreFunctionality() {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Product Discovery",
      desc: "Smart engine to find winning products based on market trends, sales data, profit margins, and social engagement.",
      tags: ["Niche Filtering", "Country Targeting", "Shipping Projections"]
    },
    {
      icon: HeartHandshake,
      title: "Supplier Integration Hub",
      desc: "A centralized dashboard to browse, compare, and connect with top-tier global suppliers.",
      tags: ["CJdropshipping", "Zendrop", "Spocket", "AliExpress"]
    },
    {
      icon: Zap,
      title: "One-Click Product Import",
      desc: "Import products instantly to directly to Shopify or WooCommerce inclusive of images, descriptions, and variants.",
      tags: ["Variants Sync", "Auto-Pricing", "Image Optimization"]
    },
    {
      icon: Monitor,
      title: "Store Management",
      desc: "Central dashboard to manage all connected stores, track imported products, and configure global rules.",
      tags: ["Pricing Rules", "Multi-store", "Bulk Edits"]
    },
    {
      icon: Package,
      title: "Order Management",
      desc: "Unified interface for viewing and managing orders across all connected storefronts.",
      tags: ["Status Tracking", "Fulfillment Sync", "Dispute Handling"]
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reporting",
      desc: "Visual dashboards detailing total sales, net profit, top-selling products, and supplier performance.",
      tags: ["Profit Margins", "Conversion Data", "Supplier ROI"]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">Core Functionality</h2>
      <p className="text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed">The frontend suite designed explicitly for the dropshipper, focusing on growth, ease, and actionable data.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm overflow-hidden group flex flex-col">
            <div className="w-10 h-10 bg-blue-50 text-[#007BFF] rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 truncate">{feature.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1">{feature.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {feature.tags.map((tag, j) => (
                <span key={j} className="px-2 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded text-[10px] font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPanel() {
  const [activeTab, setActiveTab] = React.useState('users');
  
  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'financials', label: 'Financials', icon: CreditCard },
    { id: 'cms', label: 'CMS', icon: FileText },
    { id: 'health', label: 'System Health', icon: Activity },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">Admin Dashboard</h2>
        <span className="flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-green-200">
           <Activity className="w-3 h-3 mr-1.5" />
           Systems Normal
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-6 max-w-2xl leading-relaxed">
        Central command to govern BiasharaSmart, manage users, and monitor financial and system health.
      </p>

      {/* Admin Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 mb-6 overflow-x-auto pb-px">
        {tabs.map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`flex items-center space-x-2 px-4 py-2 border-b-2 text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-[#007BFF] text-[#007BFF]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
             }`}
           >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
           </button>
        ))}
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
         {activeTab === 'users' && (
            <div className="animate-in fade-in">
               <h3 className="font-bold text-gray-900 mb-4">Recent Users</h3>
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                       <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">User</th>
                       <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plan</th>
                       <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Stores</th>
                       <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { name: "John Doe", email: "john@example.com", plan: "Pro", stores: 2 },
                      { name: "Sarah Smith", email: "sarah@example.com", plan: "Business", stores: 14 },
                      { name: "Mike Johnson", email: "mike@example.com", plan: "Free", stores: 1 }
                    ].map((user, i) => (
                       <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="py-3">
                             <p className="font-bold text-gray-900">{user.name}</p>
                             <p className="text-xs text-slate-500">{user.email}</p>
                          </td>
                          <td className="py-3">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               user.plan === 'Pro' ? 'bg-blue-100 text-blue-700' :
                               user.plan === 'Business' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                             }`}>{user.plan}</span>
                          </td>
                          <td className="py-3 font-mono text-slate-600">{user.stores}</td>
                          <td className="py-3 text-right">
                             <button className="text-[#007BFF] font-bold text-[10px] hover:underline mr-3 uppercase tracking-widest">Send Reset Link</button>
                             <button className="text-slate-600 font-bold text-[10px] hover:underline uppercase tracking-widest">Manage</button>
                          </td>
                       </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         )}

         {activeTab === 'suppliers' && (
            <div className="animate-in fade-in">
               <h3 className="font-bold text-gray-900 mb-4">Supplier API Health & Keys</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['CJdropshipping', 'AliExpress', 'Zendrop', 'Spocket'].map((sup, i) => (
                     <div key={i} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                           <p className="font-bold text-gray-900 text-sm">{sup}</p>
                           <p className="text-xs text-slate-500 font-mono mt-1 blur-[3px] select-none">sk_live_xxxxxxxxxxxx</p>
                        </div>
                        <button className="text-slate-400 hover:text-gray-900"><RefreshCw className="w-4 h-4" /></button>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'financials' && (
            <div className="animate-in fade-in space-y-6">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">Platform Revenue & Commissions</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                     <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Subscription Revenue</p>
                     <p className="text-3xl font-bold text-[#007BFF]">$14,230<span className="text-sm text-slate-400 font-normal"> / mo</span></p>
                     <p className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +12% this month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 shadow-sm">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-[10px] uppercase font-bold text-green-600 tracking-widest mb-1">Total Commissions Earned</p>
                           <p className="text-3xl font-bold text-green-700">$3,845<span className="text-sm text-green-600/60 font-normal">.50</span></p>
                        </div>
                        <div className="bg-green-200 text-green-800 text-[10px] font-bold px-2 py-1 rounded">
                           2% per order
                        </div>
                     </div>
                     <p className="text-xs text-green-700 mt-2">Earned from dropshipper order fulfillments and supplier margins.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Commission Settings */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                     <h4 className="font-bold text-gray-900 mb-2">Commission Settings</h4>
                     <p className="text-xs text-slate-500 mb-4">Set the platform fee taken from supplier orders or user payouts.</p>
                     <div className="flex items-center space-x-3">
                        <div className="relative flex-1">
                           <input type="number" defaultValue="2" className="w-full border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#007BFF]" />
                           <span className="absolute right-4 top-2.5 text-slate-400 font-bold">%</span>
                        </div>
                        <button className="bg-[#007BFF] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition shadow-sm">
                           Update Rate
                        </button>
                     </div>
                  </div>

                  {/* Subscription Pricing Settings */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                     <h4 className="font-bold text-gray-900 mb-2">Subscription Pricing Settings</h4>
                     <p className="text-xs text-slate-500 mb-4">Manage the monthly price for available user subscription plans.</p>
                     <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                           <span className="text-sm font-bold text-slate-600 w-16">Pro</span>
                           <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                              <input type="number" defaultValue="29" className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#007BFF]" />
                           </div>
                           <button className="bg-[#007BFF]/10 text-[#007BFF] px-3 py-2 rounded-lg text-sm font-bold hover:bg-[#007BFF]/20 transition">
                              Save
                           </button>
                        </div>
                        <div className="flex items-center space-x-3">
                           <span className="text-sm font-bold text-slate-600 w-16">Business</span>
                           <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                              <input type="number" defaultValue="99" className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#007BFF]" />
                           </div>
                           <button className="bg-[#007BFF]/10 text-[#007BFF] px-3 py-2 rounded-lg text-sm font-bold hover:bg-[#007BFF]/20 transition">
                              Save
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-slate-100 rounded-xl p-5 mt-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Admin Payouts</h4>
                  <p className="text-xs text-slate-500 mb-4">Withdraw accumulated platform commissions to your connected bank account.</p>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                     <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Available to withdraw</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">$1,245.00</p>
                     </div>
                     <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow-sm">
                        Issue Payout
                     </button>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2 mt-2">Extra Monetization Services (Upsells)</h4>
                  <p className="text-xs text-slate-500 mb-4">Add direct services users can buy from you inside the app.</p>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div>
                           <p className="font-bold text-sm text-gray-800">1-on-1 Mentorship Call</p>
                           <p className="text-xs text-slate-500">Charge users for a 30-min strategy session</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className="text-sm font-bold text-gray-900">$50.00</span>
                           <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition">Edit</button>
                        </div>
                     </div>
                     <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div>
                           <p className="font-bold text-sm text-gray-800">Done-For-You Store Setup</p>
                           <p className="text-xs text-slate-500">You build their Shopify store for them</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className="text-sm font-bold text-gray-900">$299.00</span>
                           <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition">Edit</button>
                        </div>
                     </div>
                     <button className="w-full border-2 border-dashed border-slate-200 text-slate-500 py-2 rounded-lg text-sm font-bold hover:border-[#007BFF] hover:text-[#007BFF] transition">
                        + Add Custom Service
                     </button>
                  </div>
               </div>

               <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6">
                  <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Recent Commission Payouts</h4>
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-slate-200">
                           <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase">Store / User</th>
                           <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase">Order Value</th>
                           <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase">Your Commission (2%)</th>
                           <th className="pb-2 text-[10px] text-slate-400 font-bold uppercase">Status</th>
                        </tr>
                     </thead>
                     <tbody className="text-xs">
                        <tr className="border-b border-slate-100 py-2">
                           <td className="py-2 text-slate-700 font-medium">BeautyGlow Shopify <span className="text-slate-400 text-[10px] block">Sarah Smith</span></td>
                           <td className="py-2 text-slate-500 font-mono">$125.00</td>
                           <td className="py-2 text-green-600 font-bold font-mono">+$2.50</td>
                           <td className="py-2"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Settled</span></td>
                        </tr>
                        <tr className="border-b border-slate-100 py-2">
                           <td className="py-2 text-slate-700 font-medium">TechNova Store <span className="text-slate-400 text-[10px] block">John Doe</span></td>
                           <td className="py-2 text-slate-500 font-mono">$890.00</td>
                           <td className="py-2 text-green-600 font-bold font-mono">+$17.80</td>
                           <td className="py-2"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Settled</span></td>
                        </tr>
                        <tr className="border-b border-slate-100 py-2">
                           <td className="py-2 text-slate-700 font-medium">AutoParts Direct <span className="text-slate-400 text-[10px] block">Mike Johnson</span></td>
                           <td className="py-2 text-slate-500 font-mono">$45.00</td>
                           <td className="py-2 text-green-600 font-bold font-mono">+$0.90</td>
                           <td className="py-2"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pending</span></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {activeTab === 'cms' && (
             <div className="animate-in fade-in">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Content Management</h3>
                  <button className="text-xs font-bold text-white bg-[#007BFF] px-3 py-1.5 rounded-lg flex items-center shadow-sm hover:bg-blue-600 transition">
                     + New Post
                  </button>
               </div>
               
               <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">Send Push Notification</h4>
                  <p className="text-xs text-slate-500 mb-4">Broadcast a notification to all users' dashboards and devices.</p>
                  <div className="flex gap-3">
                     <input type="text" placeholder="Enter message here..." className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#007BFF]" />
                     <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-6 py-2 rounded-lg transition shadow-sm flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Send Alert
                     </button>
                  </div>
               </div>

               <div className="space-y-3">
                  {[
                     { title: "Top 10 Winning Products for Q4", type: "Blog", date: "Oct 12" },
                     { title: "How to connect your Shopify store", type: "Tutorial", date: "Sep 28" },
                     { title: "System scheduled maintenance warning", type: "Announcement", date: "Sep 15" }
                  ].map((post, i) => (
                     <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-3">
                           <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded w-24 text-center">{post.type}</span>
                           <span className="text-sm font-medium text-gray-900">{post.title}</span>
                        </div>
                        <span className="text-xs text-slate-400">{post.date}</span>
                     </div>
                  ))}
               </div>
             </div>
         )}

         {activeTab === 'health' && (
            <div className="animate-in fade-in">
               <h3 className="font-bold text-gray-900 mb-4">System Status Monitoring</h3>
               <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                     <div>
                        <p className="font-bold text-sm text-gray-900">Background Job Queue (BullMQ)</p>
                        <p className="text-xs text-slate-500 mt-1">Order routing and price syncs</p>
                     </div>
                     <div className="text-right">
                        <p className="font-mono text-sm text-gray-900">12 Pending</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Healthy</p>
                     </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                     <div>
                        <p className="font-bold text-sm text-gray-900">Database (PostgreSQL)</p>
                        <p className="text-xs text-slate-500 mt-1">Primary read/write cluster</p>
                     </div>
                     <div className="text-right">
                        <p className="font-mono text-sm text-gray-900">14% Load</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Healthy</p>
                     </div>
                  </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                     <div>
                        <p className="font-bold text-sm text-gray-900">API Gateway Edge</p>
                        <p className="text-xs text-slate-500 mt-1">Client incoming traffic latency</p>
                     </div>
                     <div className="text-right">
                        <p className="font-mono text-sm text-gray-900">42ms avg</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Healthy</p>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

function ApisIntegrations() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">APIs & Integrations</h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-2xl">Robust technical integrations that form the backbone of BiasharaSmart's routing and sync capabilities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supplier APIs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 text-[#007BFF]">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-md font-bold text-gray-900">Supplier APIs</h3>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-[#007BFF] pl-4">
              <h4 className="font-bold text-gray-900 mb-1 tracking-tight text-sm">CJdropshipping API</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Real-time product data extraction, bi-directional inventory syncing, and automated order placement.</p>
            </div>
            <div className="border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-gray-900 mb-1 tracking-tight text-sm">AliExpress API</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Mass product sourcing, review extraction, and shipping tier data retrieval.</p>
            </div>
            <div className="border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-gray-900 mb-1 tracking-tight text-sm">Universal Supplier Adapter</h4>
              <p className="text-xs text-slate-500 leading-relaxed">A custom internal framework designed to easily wedge in future suppliers using standardized REST/GraphQL endpoints.</p>
            </div>
          </div>
        </div>

        {/* E-Commerce APIs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mr-4 text-slate-700">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h3 className="text-md font-bold text-gray-900">E-Commerce Platforms</h3>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-[#007BFF] pl-4">
              <h4 className="font-bold text-gray-900 mb-1 tracking-tight text-sm">Shopify Admin API</h4>
              <p className="text-xs text-slate-500 leading-relaxed">OAuth authentication, payload injection for new products, listening to order creation webhooks, and pushing fulfillment updates.</p>
            </div>
            <div className="border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-gray-900 mb-1 tracking-tight text-sm">WooCommerce REST API</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Key-based auth to interact with WordPress instances for the same CRUD operations on products and orders.</p>
            </div>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mr-4 text-slate-700">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-md font-bold text-gray-900">Payment Gateways</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100 leading-relaxed">
            For charging users to use BiasharaSmart itself.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl flex items-start border border-slate-100/50">
               <Zap className="w-4 h-4 text-[#007BFF] mr-3 shrink-0" />
               <div>
                  <h4 className="font-bold text-gray-900 text-xs">Stripe API (Critical)</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Handles subscription logic, recurring billing, tier upgrades (Free/Pro), and payment webhooks.</p>
               </div>
            </div>
            <p className="text-[11px] font-bold text-slate-400 pl-2 border-l-2 border-yellow-400 uppercase tracking-widest leading-relaxed mt-2">
              Future Expandability: Abstract payment layer to support PayPal integrations or regional systems like M-Pesa natively.
            </p>
          </div>
        </div>

        {/* Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mr-4 text-slate-700">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-md font-bold text-gray-900">Shipping & Logistics</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
             Aggregating and normalizing tracking data to display beautifully inside the app.
          </p>
           <div className="bg-slate-50 p-4 rounded-xl flex items-start border border-slate-100/50">
               <Globe className="w-4 h-4 text-[#007BFF] mr-3 shrink-0" />
               <div>
                  <h4 className="font-bold text-gray-900 text-xs">EasyPost / Shippo API</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Standardizes messy tracking data from dozens of Chinese couriers into a clean, unified status stream (e.g., "In Transit", "Delivered").</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function AutomationEngine() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">Automation Engine</h2>
      <p className="text-sm text-slate-500 mb-10 max-w-2xl leading-relaxed">The "Magic" behind the platform. Asynchronous background workers ensuring data integrity and zero manual tasks for the user.</p>

      <div className="relative border-l border-slate-200 ml-6 space-y-12 pb-12">
        <div className="relative">
          <div className="absolute -left-[24.5px] bg-white border-2 border-[#007BFF] w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
            <RefreshCw className="w-5 h-5 text-[#007BFF]" />
          </div>
          <div className="pl-10">
            <h3 className="text-md font-bold text-gray-900 mb-2">Automated Order Fulfillment</h3>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
               <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  When a new purchase occurs on a user's store, BiasharaSmart intercepts the webhook, formats the payload, and instantly proxies the order to the correct supplier.
               </p>
               <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 bg-slate-50 p-3 rounded-lg overflow-x-auto border border-slate-100/50">
                  <span>Shopify/Woo Webhook</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-[#007BFF]">Biashara Queue</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>CJ Dropshipping API</span>
               </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-[24.5px] bg-white border border-slate-200 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
            <Database className="w-5 h-5 text-slate-600" />
          </div>
          <div className="pl-10">
            <h3 className="text-md font-bold text-gray-900 mb-2">Real-Time Inventory & Price Sync</h3>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
               <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  A distributed cron-job system continuously monitors supplier catalogs. If an item drops out of stock or base cost increases, it updates the user's connected store immediately to prevent losses.
               </p>
               <ul className="text-[11px] text-slate-600 space-y-2 font-medium">
                 <li className="flex items-center"><Zap className="w-3 h-3 text-orange-500 mr-2" /> Stop sales on Out-of-Stock items instantly.</li>
                 <li className="flex items-center"><Zap className="w-3 h-3 text-[#007BFF] mr-2" /> Auto-adjust store price based on predefined math rules (e.g. Base Cost * 3).</li>
               </ul>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-[24.5px] bg-white border border-slate-200 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
            <Bell className="w-5 h-5 text-slate-600" />
          </div>
          <div className="pl-10">
            <h3 className="text-md font-bold text-gray-900 mb-2">Automated Tracking Updates</h3>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
               <p className="text-slate-500 text-xs leading-relaxed">
                  Suppliers generate tracking IDs asynchronously (often days later). BiasharaSmart polls the supplier API for status changes. Once a tracking ID is minted, it is automatically pushed to Shopify/WooCommerce, which then triggers the final email to the buyer.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UiUxDesign() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">UI & UX Design Philosophy</h2>
      <p className="text-sm text-slate-500 mb-10 max-w-2xl leading-relaxed">Crafting an interface that is extremely user-friendly ("iwe friend"), clean, and welcoming to absolute beginners, while retaining power-user workflows.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-slate-100 pb-2">Color Palette Matrix</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg shadow-inner flex items-center justify-center text-white font-mono text-[10px] mr-4 font-bold" style={{ backgroundColor: '#007BFF' }}>
                #007BFF
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Primary Blue</p>
                <p className="text-xs text-slate-500">Buttons, active states, key data highlights, branding.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg shadow-inner border border-slate-200 flex items-center justify-center text-gray-800 font-mono text-[10px] mr-4 bg-white font-bold">
                #FFFFFF
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Secondary White</p>
                <p className="text-xs text-slate-500">Main background, card bodies, clean spacing.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg shadow-inner flex items-center justify-center text-white font-mono text-[10px] mr-4 font-bold" style={{ backgroundColor: '#333333' }}>
                #333333
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Dark Grey Text</p>
                <p className="text-xs text-slate-500">Headings, primary body text for maximal readability.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-slate-500 font-mono text-[10px] mr-4 bg-slate-50 border border-slate-100 font-bold">
                Slate
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Subtle Accents</p>
                <p className="text-xs text-slate-500">App backgrounds, hover states, input fill.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
           <h3 className="text-lg font-bold text-gray-900 border-b border-slate-100 pb-2 mb-6">The "10-Minute" Setup Experience</h3>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10">
                <Smartphone className="w-48 h-48 -mr-10 -mt-10" />
             </div>
             
             <ol className="relative z-10 space-y-5">
               <li className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-[#007BFF] text-white text-[10px] font-bold mr-3 shrink-0 mt-0.5">01</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">Quick sign up via Email or Google Auth.</p>
               </li>
               <li className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-[#007BFF] text-white text-[10px] font-bold mr-3 shrink-0 mt-0.5">02</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">Connect existing Shopify store via a single OAuth button prompt.</p>
               </li>
               <li className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-[#007BFF] text-white text-[10px] font-bold mr-3 shrink-0 mt-0.5">03</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">Guided "Swiping" or browsing of AI-recommended winning products.</p>
               </li>
               <li className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-[#007BFF] text-white text-[10px] font-bold mr-3 shrink-0 mt-0.5">04</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">One-click import of chosen product. Live celebration animation.</p>
               </li>
             </ol>
             
             <div className="mt-6 pt-4 border-t border-blue-200">
               <p className="text-[11px] text-blue-800 font-bold flex items-center">
                 <HeartHandshake className="w-3 h-3 mr-2" />
                 Goal: First dopamine hit achieved before user touches their storefront.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStack() {
  const stack = [
    {
      category: "Frontend (Mobile & Web)",
      tech: "React Native (Expo) & React (Vite)",
      reason: "Allows sharing core business logic between the web dashboard and the mobile applications. Ensures a rapid, cross-platform release cycle."
    },
    {
      category: "Backend Services",
      tech: "Node.js with NestJS or Express",
      reason: "Scalable, asynchronous handling via Event Loops makes it ideal for processing thousands of webhooks and API calls concurrently."
    },
    {
      category: "Database",
      tech: "PostgreSQL",
      reason: "ACID compliant, heavily structured, and perfect for strict relational data like Users -> Stores -> Products -> Orders."
    },
    {
      category: "Job Queues & Caching",
      tech: "Redis + BullMQ",
      reason: "Crucial for handling API rate limits from suppliers and Shopify. Jobs like 'Sync Price' go into a robust queue to ensure they are processed safely over time."
    },
    {
      category: "Cloud Infrastructure",
      tech: "AWS (ECS, RDS) or Google Cloud Run",
      reason: "Containerized deployment allowing auto-scaling during high-traffic events (Q4 / Black Friday)."
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 tracking-tight">Technology Stack Recommendation</h2>
      <p className="text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed">A modern, scalable architecture designed to handle high-throughput order processing and webhook management.</p>

      <div className="bg-white border text-left border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Architecture Layer</th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Suggested Tech</th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2">Rationale</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {stack.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-blue-100 text-[#007BFF]">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{item.tech}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500 leading-relaxed">{item.reason}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-[#007BFF] rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
         <div>
            <h4 className="font-bold mb-1 text-sm tracking-tight">Ready for Development</h4>
            <p className="text-xs text-white/80">This stack ensures BiasharaSmart can handle millions of SKUs and orders safely.</p>
         </div>
         <button className="bg-white text-[#007BFF] font-bold py-2 px-6 rounded-lg transition-colors flex items-center text-sm shadow">
            Proceed to Phase 1
            <ArrowRight className="w-4 h-4 ml-2" />
         </button>
      </div>
    </div>
  );
}
