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
    retailers: RetailerResult[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const bestPrice = Math.min(...product.retailers.map(r => r.price));
  const bestRetailer = product.retailers.find(r => r.price === bestPrice);

  return (
    <div className="glass-card group flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4">
        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
          {product.retailers.length} Sellers
        </span>
      </div>

      <div className="flex-grow pt-4">
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

      <div className="pt-6">
        <a 
          href={bestRetailer?.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary w-full group-hover:scale-[1.03] active:scale-95 transition-all"
        >
          Grab This Deal
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
