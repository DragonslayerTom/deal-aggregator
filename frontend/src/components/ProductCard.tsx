import React from 'react';

interface RetailerResult {
  retailer: string;
  price: number;
  url: string;
  highlights?: string;
}

interface ProductCardProps {
  product: {
    name: string;
    image?: string;
    type?: string;
    retailers: RetailerResult[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const bestPrice = Math.min(...product.retailers.map(r => r.price));
  const bestRetailer = product.retailers.find(r => r.price === bestPrice);

  return (
    <div className="glass-card group flex flex-col h-full overflow-hidden relative p-0">
      {/* Image Header */}
      <a 
        href={bestRetailer?.url || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full h-48 bg-white/5 relative overflow-hidden flex items-center justify-center shrink-0 border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer group/image"
      >
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-[80%] max-h-[80%] object-contain mix-blend-lighten opacity-80 group/image-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {product.type && (
          <div className="absolute top-3 left-3">
            <span className="bg-purple-600/90 backdrop-blur-md shadow-lg shadow-purple-500/40 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-purple-400/30">
              {product.type}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 shadow-lg shadow-blue-500/50 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mix-blend-screen">
            {product.retailers.length} Sellers
          </span>
        </div>
      </a>

      <div className="flex-grow p-6 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-black text-white tracking-tighter">
            ${bestPrice.toFixed(0)}<span className="text-xl">.{(bestPrice % 1).toFixed(2).slice(2)}</span>
          </span>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Lowest Now</span>
        </div>

        <div className="space-y-3 mb-8">
          {product.retailers.slice(0, 3).map((r, i) => (
            <div key={i} className="flex justify-between items-center text-sm p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] group/item hover:bg-white/[0.05] transition-colors">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                {r.retailer}
              </span>
              <span className="font-bold text-slate-200">${r.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <a 
          href={bestRetailer?.url || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary w-full cursor-pointer hover:scale-105 active:scale-95 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 font-black text-lg py-4"
        >
          Buy Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
