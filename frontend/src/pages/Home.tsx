import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative isolate min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="text-center max-w-5xl mx-auto space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: Neural Search V2.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Hunt the best deals, <br/>
            <span className="text-gradient">effortlessly.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            We track thousands of products across 50+ retailers in real-time. 
            Find the lowest prices and get notified instantly when they drop.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="flex glass rounded-[2.5rem] p-3 transition-all duration-500 group-focus-within:ring-4 group-focus-within:ring-blue-500/20 group-focus-within:bg-white/[0.08] shadow-2xl shadow-black/40">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="iPhone 15 Pro, RTX 4080, Coffee Maker..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-8 py-4 text-xl text-white placeholder-slate-500 font-medium"
            />
            <button
              type="submit"
              className="btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Search
            </button>
          </div>
        </form>

        <div className="pt-12 space-y-6">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Trusted by shoppers at</p>
          <div className="flex flex-wrap justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {['Amazon', 'eBay', 'Best Buy', 'Walmart', 'Target', 'Newegg'].map((brand) => (
              <div key={brand} className="glass py-3 px-8 rounded-2xl text-sm font-bold text-slate-300 border-white/5 hover:border-blue-500/30 hover:bg-white/5 transition-all cursor-default group">
                <span className="group-hover:text-blue-400 transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
