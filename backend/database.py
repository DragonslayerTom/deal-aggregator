from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

load_dotenv()

# Get DATABASE_URL from environment (Railway sets this automatically)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Fallback: try to construct from individual environment variables
    db_user = os.getenv("PGUSER", "deal_user")
    db_pass = os.getenv("PGPASSWORD", "password")
    db_host = os.getenv("PGHOST", "localhost")
    db_port = os.getenv("PGPORT", "5432")
    db_name = os.getenv("PGDATABASE", "deal_aggregator")
    
    DATABASE_URL = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
    logger.warning(f"⚠ DATABASE_URL not set, using constructed URL")

logger.info(f"🔗 Connecting to database: {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'unknown'}")

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()
    logger.info("✅ Database connection successful")
except Exception as e:
    logger.error(f"❌ Database connection failed: {e}")
    raise

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
