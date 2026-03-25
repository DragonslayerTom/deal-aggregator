import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface RetailerResult {
  retailer: string;
  price: number;
  url: string;
  highlights?: string;
}

interface Product {
  name: string;
  retailers: RetailerResult[];
}

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/search', {
        params: { q: searchQuery, limit: 12 }
      });
      // The API returns { products: [...] }
      setProducts(response.data.products || []);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch deals. Please check if the backend is running.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
          Real-time Results
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {loading ? (
            <span className="flex items-center gap-4">
              Scouring the web
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </span>
          ) : (
            <>Deals for <span className="text-gradient">"{query}"</span></>
          )}
        </h2>
        <p className="text-slate-400 font-medium">
          Comparison shopping across {loading ? 'multiple retailers' : products.length > 0 ? 'top stores' : 'the interweb'}.
        </p>
      </div>

      {error && (
        <div className="glass border-red-500/20 bg-red-500/5 text-red-400 p-6 rounded-3xl mb-12 flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card h-[400px] animate-pulse">
              <div className="h-4 w-1/4 bg-white/5 rounded-full mb-8"></div>
              <div className="h-8 w-3/4 bg-white/5 rounded-xl mb-4"></div>
              <div className="h-12 w-1/2 bg-white/5 rounded-xl mb-12"></div>
              <div className="space-y-3">
                <div className="h-10 w-full bg-white/5 rounded-xl"></div>
                <div className="h-10 w-full bg-white/5 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : !loading && query && (
            <div className="text-center py-32 glass-card">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-2">No deals found for "{query}"</p>
              <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any items matching your search. Try adjusting your keywords or checking another category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
