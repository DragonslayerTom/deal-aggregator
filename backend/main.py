from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
import os
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Deal Aggregator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Track loaded routes
loaded_routes = []
errors = []

# Load scraper (always works)
try:
    from scraper import DealAggregator
    logger.info("✓ Scraper loaded")
except Exception as e:
    logger.warning(f"⚠ Scraper failed: {e}")

# Try database, but don't require it
try:
    from database import engine, Base
    Base.metadata.create_all(bind=engine)
    logger.info("✓ Database initialized")
except Exception as e:
    error_msg = f"⚠ Database initialization failed (using mock scraper): {str(e)}"
    errors.append(error_msg)
    logger.warning(error_msg)

# Add search route with scraper fallback
@app.get("/api/search")
async def search_endpoint(q: str, limit: int = 20):
    """Search using real scraper (mock data if retailers blocked)"""
    import asyncio
    try:
        from scraper import DealAggregator
        agg = DealAggregator()
        products_data = await agg.search_all(q, limit=10)
        
        # Group by product name
        results = {}
        for item in products_data:
            key = item['name'][:50]
            if key not in results:
                results[key] = {'name': item['name'], 'retailers': []}
            results[key]['retailers'].append({
                'retailer': item['retailer'],
                'price': item['price'],
                'url': item['url']
            })
        
        products = list(results.values())
        for p in products:
            p['retailers'].sort(key=lambda x: x['price'])
        products.sort(key=lambda x: x['retailers'][0]['price'] if x['retailers'] else float('inf'))
        
        return {
            "query": q,
            "products": products[:limit],
            "total": len(products),
            "source": "live_scraper"
        }
    except Exception as e:
        return {
            "query": q,
            "products": [],
            "error": str(e)
        }

loaded_routes = ["search (scraper)"]
logger.info("✓ Search endpoint (scraper) loaded")

@app.get("/")
async def root():
    return {
        "message": "Deal Aggregator API",
        "version": "1.0.0",
        "status": "running",
        "loaded_routes": loaded_routes,
        "errors": errors if errors else None
    }

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "routes_loaded": len(loaded_routes) > 0,
        "available_routes": loaded_routes,
        "initialization_errors": errors if errors else None
    }

@app.get("/debug")
async def debug():
    """Debug endpoint to show what's loaded"""
    return {
        "status": "debug",
        "routes_loaded": loaded_routes,
        "errors": errors,
        "available_endpoints": [
            {"path": route.path, "methods": list(route.methods)} 
            for route in app.routes
        ]
    }

# Serve frontend static files (if built)
# Try multiple paths to find frontend dist
possible_paths = [
    Path(__file__).parent.parent / "frontend" / "dist",
    Path(__file__).parent.parent.parent / "frontend" / "dist",
    Path("/app/frontend/dist"),  # Railway might use /app as root
]

frontend_dist = None
for path in possible_paths:
    if path.exists():
        frontend_dist = path
        break

if frontend_dist:
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
    logger.info(f"✓ Frontend static files mounted from {frontend_dist}")
else:
    logger.warning(f"⚠ Frontend dist not found. Tried: {[str(p) for p in possible_paths]}")
