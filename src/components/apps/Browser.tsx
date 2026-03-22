import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCcw, Search, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://nebula.systems');
  const [inputUrl, setInputUrl] = useState('https://nebula.systems');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Address Bar */}
      <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
        <div className="flex items-center gap-2 text-gray-500">
          <button className="p-1 hover:bg-gray-200 rounded transition-colors"><ArrowLeft size={16} /></button>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors"><ArrowRight size={16} /></button>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors"><RotateCcw size={16} /></button>
        </div>
        <form onSubmit={handleGo} className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Globe size={14} />
          </div>
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-full py-1.5 pl-9 pr-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </form>
        <button className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500"><ExternalLink size={16} /></button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto">
        <div className="max-w-4xl mx-auto p-12 space-y-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Globe size={40} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Nebula Systems</h1>
            <p className="text-gray-500 text-lg">The future of computing is here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100 hover:border-indigo-500/20 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Neural Search</h3>
              <p className="text-gray-500 leading-relaxed">Experience the power of AI-driven search that understands context and intent.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100 hover:border-indigo-500/20 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Global Network</h3>
              <p className="text-gray-500 leading-relaxed">Connect to the decentralized web with unparalleled speed and security.</p>
            </div>
          </div>

          <div className="p-12 bg-indigo-900 rounded-[40px] text-white space-y-6 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full" />
            
            <h2 className="text-3xl font-bold relative z-10">Ready to explore?</h2>
            <p className="text-indigo-100 text-lg relative z-10 max-w-xl">Join millions of users who are already building the next generation of the internet on NebulaOS.</p>
            <button className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all relative z-10 shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
