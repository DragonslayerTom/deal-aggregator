from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import asyncio
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Import scraper
try:
    from scraper import DealAggregator
    HAS_SCRAPER = True
except:
    HAS_SCRAPER = False
    logger.warning("Scraper not available - using mock data")

@router.get("/")
async def search(
    q: str,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Search for products from real retailers"""
    
    if not q or len(q.strip()) < 2:
        return {
            "query": q,
            "products": [],
            "total": 0,
            "error": "Query must be at least 2 characters"
        }
    
    try:
        # Use real scraper if available
        if HAS_SCRAPER:
            aggregator = DealAggregator()
            products_data = await aggregator.search_all(q, limit=10)
            
            # Group by product name, keep unique retailers
            results = {}
            for item in products_data:
                key = item['name'][:50]  # Group by first 50 chars
                if key not in results:
                    results[key] = {'name': item['name'], 'retailers': []}
                
                results[key]['retailers'].append({
                    'retailer': item['retailer'],
                    'price': item['price'],
                    'url': item['url']
                })
            
            # Sort by lowest price
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
        
        else:
            # Fallback: empty response
            return {
                "query": q,
                "products": [],
                "total": 0,
                "error": "Scraper not configured"
            }
    
    except Exception as e:
        logger.error(f"Search error: {e}")
        return {
            "query": q,
            "products": [],
            "total": 0,
            "error": str(e)
        }
