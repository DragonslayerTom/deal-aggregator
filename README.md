# Deal Aggregator

> Find the best deals across 50+ retailers. Search, compare prices, set price alerts, save to watchlist.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with FastAPI](https://img.shields.io/badge/Built%20with-FastAPI-green)](https://fastapi.tiangolo.com)
[![Built with React](https://img.shields.io/badge/Built%20with-React-blue)](https://react.dev)

## Features

✅ **Real-Time Price Comparison** — Compare prices across 50+ retailers instantly
✅ **Search Products** — Find what you're looking for
✅ **Price Alerts** — Get notified when prices drop
✅ **Watchlists** — Save favorite products
✅ **Mobile-Friendly** — Works on all devices
✅ **Fast & Free** — No signup required for basic features

## Quick Start

### Using Docker (Recommended)

```bash
# Clone & navigate
git clone https://github.com/yourusername/deal-aggregator.git
cd deal-aggregator

# Start all services
docker-compose up -d

# Open browser
http://localhost:5173
```

Services will be available at:
- **Frontend:** http://localhost:5173 (React + Vite)
- **Backend API:** http://localhost:8000 (FastAPI)
- **API Docs:** http://localhost:8000/docs
- **Database:** PostgreSQL on localhost:5432

### Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
deal-aggregator/
├── backend/                    # FastAPI backend
│   ├── main.py                # App entry point
│   ├── database.py            # SQLAlchemy + PostgreSQL
│   ├── models.py              # Database models
│   ├── routes/                # API endpoints (search, products)
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── main.tsx           # React entry
│   │   ├── App.tsx            # Router
│   │   ├── pages/             # Home, Search, 404
│   │   ├── components/        # Layout, UI components
│   │   └── styles/            # TailwindCSS
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml         # Local development orchestration
├── DEPLOY.md                  # Railway deployment guide
└── README.md                  # This file
```

## API Endpoints

- `GET /api/search?q=headphones` — Search products
- `GET /api/products` — List all products
- `GET /api/products/{id}` — Get product with all retailer prices

See `/docs` for interactive API documentation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite + TailwindCSS |
| **Backend** | FastAPI + SQLAlchemy + PostgreSQL |
| **Infrastructure** | Docker + Docker Compose |
| **Deployment** | Railway (or any container platform) |

## Roadmap

### Phase 1 (Current)
- [x] Core search & comparison
- [x] Basic product database
- [x] Frontend UI

### Phase 2
- [ ] Web scraping (Amazon, eBay, Best Buy, Walmart, etc.)
- [ ] Price history tracking
- [ ] User authentication
- [ ] Watchlists & price alerts

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Advanced filters (brand, rating, shipping)
- [ ] Trending products
- [ ] Analytics dashboard

### Phase 4
- [ ] AI-powered recommendations
- [ ] Browser extension
- [ ] Partner retailer integrations

## Deployment

### Railway (Recommended)

See [DEPLOY.md](./DEPLOY.md) for complete Railway deployment guide.

Quick version:
```bash
railway login
railway init
railway add  # PostgreSQL
railway up
```

### Docker

```bash
# Build images
docker build -f backend/Dockerfile -t deal-aggregator-api ./backend
docker build -f frontend/Dockerfile -t deal-aggregator-web ./frontend

# Push to registry
docker push yourusername/deal-aggregator-api
docker push yourusername/deal-aggregator-web
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions, please open a GitHub issue.

## Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com)
- Built with [React](https://react.dev)
- Styled with [TailwindCSS](https://tailwindcss.com)
- Deployed with [Railway](https://railway.app)
