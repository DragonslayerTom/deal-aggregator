import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="max-w-5xl mx-auto glass rounded-3xl px-8 h-16 flex items-center justify-between shadow-2xl shadow-black/50 border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/20">
            S
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Sale<span className="text-blue-500 group-hover:text-indigo-400">Finder</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/" className="hover:text-white transition-colors py-1 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/search?q=trending" className="hover:text-white transition-colors py-1 relative group">
              Trending
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/watchlist" className="hover:text-white transition-colors py-1 relative group">
              Watchlist
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          <button 
             onClick={() => navigate('/watchlist')}
             className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm font-semibold text-white backdrop-blur-sm active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
