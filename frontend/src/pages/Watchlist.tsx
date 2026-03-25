import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface WatchlistItem {
  id: string
  productName: string
  targetPrice: number
  currentPrice?: number
  bestRetailer?: string
  addedAt: string
  notified: boolean
}

export default function Watchlist() {
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    productName: '',
    targetPrice: 0
  })

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dealWatchlist')
    if (stored) {
      setWatchlist(JSON.parse(stored))
    }
  }, [])

  // Save watchlist to localStorage
  const saveWatchlist = (items: WatchlistItem[]) => {
    localStorage.setItem('dealWatchlist', JSON.stringify(items))
    setWatchlist(items)
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.productName.trim() || newItem.targetPrice <= 0) return

    const item: WatchlistItem = {
      id: Date.now().toString(),
      productName: newItem.productName,
      targetPrice: newItem.targetPrice,
      addedAt: new Date().toISOString(),
      notified: false
    }

    saveWatchlist([...watchlist, item])
    setNewItem({ productName: '', targetPrice: 0 })
    setShowAddForm(false)
  }

  const removeItem = (id: string) => {
    saveWatchlist(watchlist.filter(item => item.id !== id))
  }

  const searchProduct = (productName: string) => {
    navigate(`/search?q=${encodeURIComponent(productName)}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight flex items-center gap-4">
            <span className="text-gradient">Price</span> Watch
            <span className="text-2xl animate-pulse">⭐</span>
          </h1>
          <p className="text-slate-400 font-medium">Tracking {watchlist.length} items for price drops across the web.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`btn-primary shadow-2xl ${showAddForm ? 'from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500' : ''}`}
        >
          {showAddForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Item
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="glass-card mb-16 border-blue-500/20 shadow-2xl shadow-blue-500/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-sm font-black uppercase tracking-widest text-slate-500">Product Name</label>
              <input
                type="text"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                placeholder="e.g., MacBook Pro 16 M3"
                className="input-glass w-full px-6 py-4 text-lg text-white font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-black uppercase tracking-widest text-slate-500">Target Price ($)</label>
              <input
                type="number"
                value={newItem.targetPrice || ''}
                onChange={(e) => setNewItem({ ...newItem, targetPrice: parseFloat(e.target.value) || 0 })}
                placeholder="Maximum you'll pay"
                className="input-glass w-full px-6 py-4 text-lg text-white font-medium"
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="btn-primary w-full py-5 text-lg"
              >
                Start Watching
              </button>
            </div>
          </form>
        </div>
      )}

      {watchlist.length === 0 ? (
        <div className="glass-card p-20 text-center space-y-8">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">Your list is empty</p>
            <p className="text-slate-500 max-w-sm mx-auto">Add the products you're dreaming of, and we'll tell you the microsecond the price hits your target.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary mx-auto"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {watchlist.map((item) => (
            <div key={item.id} className="glass-card group hover:shadow-blue-500/10">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.productName}</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Tracked since {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500/10 border border-red-500/10 transition-all active:scale-90"
                  title="Remove Item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Target Price</p>
                  <p className="text-3xl font-black text-blue-400 tracking-tighter">${item.targetPrice.toFixed(2)}</p>
                </div>
                {item.currentPrice ? (
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Current Best</p>
                    <div className="flex items-center gap-2">
                       <p className={`text-3xl font-black tracking-tighter ${item.currentPrice <= item.targetPrice ? 'text-green-400' : 'text-orange-400'}`}>
                        ${item.currentPrice.toFixed(2)}
                      </p>
                      {item.currentPrice <= item.targetPrice && (
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.bestRetailer}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Status</p>
                    <p className="text-sm font-bold text-slate-400 pt-2 italic">Waiting for scan...</p>
                  </div>
                )}
              </div>

              {item.notified && (
                <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                  Price match found! Check email.
                </div>
              )}

              <button
                onClick={() => searchProduct(item.productName)}
                className="w-full btn-primary !bg-white/5 border-white/10 hover:!bg-white/10 text-white font-bold group-hover:border-blue-500/30"
              >
                Find Best Prices Now
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 p-8 glass rounded-3xl border-blue-500/10 bg-blue-500/[0.02]">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          Pro Tip: Neural Scanning
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-black tracking-widest">•</span>
            Add items with ambitious target prices; our AI scans thousands of niche stores.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-black tracking-widest">•</span>
            We check stock levels and verified retailer ratings to ensure quality deals.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-black tracking-widest">•</span>
            Install our browser extension to add items directly from any store page.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-black tracking-widest">•</span>
            Items are refreshed every 15 minutes for maximum price accuracy.
          </li>
        </ul>
      </div>
    </div>
  )
}
