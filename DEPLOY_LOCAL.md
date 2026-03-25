# Local Docker Deployment

## Prerequisites
- Docker & Docker Compose installed
- Port 3000 (frontend), 8000 (API), 5432 (DB) available

## Quick Start

```bash
# Clone repo
git clone https://github.com/DragonslayerTom/Sale-Finder.git
cd Sale-Finder

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## Access

- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs
- **Database:** localhost:5432

## Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f api
```

## Stop

```bash
docker-compose -f docker-compose.prod.yml down
```

## Environment Variables

Edit `docker-compose.prod.yml` to change:
- `POSTGRES_PASSWORD` (default: dealapp_secure_password)
- `DATABASE_URL`
- `REACT_APP_API_URL` (for frontend API endpoint)

## Production Deployment

For Railway/Heroku/Cloud Run:
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables (DATABASE_URL, etc)
4. Deploy

The `Dockerfile` in each directory handles production builds.
