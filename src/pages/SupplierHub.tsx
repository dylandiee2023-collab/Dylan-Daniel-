import React from 'react';
import { Package, Search, Import, RefreshCw, Zap, TrendingUp, SearchCode, Database } from 'lucide-react';

export default function SupplierHub() {
  const suppliers = [
    { name: "CJdropshipping", logo: "https://cjdropshipping.com/favicon.ico", status: "Connected", syncState: "Active" },
    { name: "Zendrop", logo: "https://zendrop.com/favicon.ico", status: "Available", syncState: "Inactive" },
    { name: "Spocket", logo: "https://spocket.co/favicon.ico", status: "Available", syncState: "Inactive" },
    { name: "AliExpress", logo: "https://aliexpress.com/favicon.ico", status: "API Token Required", syncState: "Inactive" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">Supplier Integration Hub</h2>
        <button className="bg-[#007BFF] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow disabled:opacity-50 hover:bg-blue-600 transition">
          <Zap className="w-4 h-4 mr-2" />
          Add New Supplier
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed">
        Connect, manage, and sync products from global dropshipping giants instantly.
      </p>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Suppliers", val: "1", icon: Package },
          { label: "Synced Products", val: "342", icon: Database },
          { label: "Pending Orders", val: "14", icon: RefreshCw },
          { label: "Fulfillment Rate", val: "99.9%", icon: TrendingUp },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</p>
                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.val}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                 <stat.icon className="w-4 h-4 text-[#007BFF]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="border-b border-slate-100 p-4 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Supported Networks</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search suppliers..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/50" />
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {suppliers.map((sup, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200">
                    {/* Placeholder image logo since favicons might block or fail */}
                    <div className="font-black text-slate-300 text-xl">{sup.name.charAt(0)}</div>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">{sup.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Official Integration</p>
                 </div>
               </div>
               
               <div className="flex items-center space-x-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    sup.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sup.status}
                  </span>
                  
                  {sup.status === 'Connected' ? (
                     <button className="flex items-center text-xs font-bold text-slate-500 hover:text-gray-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white">
                        <Settings className="w-3 h-3 mr-2" />
                        Configure
                     </button>
                  ) : (
                     <button className="flex items-center text-xs font-bold text-[#007BFF] hover:text-white hover:bg-[#007BFF] border border-[#007BFF] px-3 py-1.5 rounded-lg transition-colors bg-white">
                        Connect
                     </button>
                  )}
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-br from-[#007BFF] to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
               <TrendingUp className="w-48 h-48 -mr-10 -mt-10" />
            </div>
            <div className="relative z-10">
               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Import className="w-5 h-5 text-white" />
               </div>
               <h3 className="font-bold text-lg mb-2">1-Click Product Import</h3>
               <p className="text-white/80 text-xs leading-relaxed mb-6">
                 Browse billions of products. Push them directly to your Shopify or WooCommerce store with auto-calculated pricing margins and variants entirely intact.
               </p>
               <button className="bg-white text-[#007BFF] text-sm font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition w-max block">
                 Try Demo Import
               </button>
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
               <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="w-5 h-5 text-orange-500" />
               </div>
               <h3 className="font-bold text-gray-900 text-lg mb-2">Real-Time Synchronization</h3>
               <p className="text-slate-500 text-xs leading-relaxed mb-4">
                 Never sell an out-of-stock item again. Our background workers sync stock levels and cost fluctuations directly from your suppliers to your storefront safely.
               </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 pt-3 mt-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase">Last Sync</span>
               <span className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Just now
               </span>
            </div>
         </div>
      </div>
    </div>
  );
}

// Temporary icon definition for Settings in this file since we are using generic icons
function Settings(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
