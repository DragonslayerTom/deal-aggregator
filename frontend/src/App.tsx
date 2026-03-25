import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-200 selection:bg-blue-500/30">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
