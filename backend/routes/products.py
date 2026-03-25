from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Price

router = APIRouter()

@router.get("/")
async def list_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all products"""
    return db.query(Product).offset(skip).limit(limit).all()

@router.get("/{product_id}")
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get product by ID with all prices"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    prices = db.query(Price).filter(Price.product_id == product_id).all()
    
    return {
        "id": product.id,
        "name": product.name,
        "category": product.category,
        "prices": [
            {
                "retailer": p.retailer,
                "price": p.price,
                "url": p.url,
                "rating": p.rating,
                "in_stock": p.in_stock
            }
            for p in prices
        ]
    }
