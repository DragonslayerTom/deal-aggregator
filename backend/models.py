from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Price(Base):
    __tablename__ = "prices"
    
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    retailer = Column(String, index=True)
    url = Column(String)
    price = Column(Float)
    original_price = Column(Float, nullable=True)
    in_stock = Column(Boolean, default=True)
    rating = Column(Float, nullable=True)
    scraped_at = Column(DateTime, default=datetime.utcnow, index=True)
