# Cloud Deployment Guide

## Option 1: Railway.app (Recommended - Easiest)

### Prerequisites
- Railway account (railway.app)
- GitHub repo connected

### Steps

1. **Connect GitHub Repository**
   - Go to railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Authorize GitHub
   - Select `DragonslayerTom/Sale-Finder`

2. **Configure Services**
   - Railway auto-detects Dockerfile
   - Creates 2 services: frontend + backend
   - Creates PostgreSQL database automatically

3. **Set Environment Variables**
   ```
   DATABASE_URL=postgresql://...  (auto-generated)
   ENVIRONMENT=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get live URLs

### Result
- Frontend: `https://sale-finder-web.railway.app`
- API: `https://sale-finder-api.railway.app`
- Database: Auto-managed PostgreSQL

---

## Option 2: Heroku

### Prerequisites
- Heroku CLI
- GitHub connected

### Steps

```bash
# Install Heroku CLI
curl https://cli.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create sale-finder-api
heroku create sale-finder-web --buildpack heroku/nodejs

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Option 3: Render.com

### Steps

1. Go to render.com
2. Connect GitHub
3. Create Web Service
4. Select repository
5. Set build command: `npm install && npm run build`
6. Set start command: `npm run dev`
7. Add PostgreSQL database
8. Deploy

---

## Option 4: Self-Hosted (VPS)

### On Your Server

```bash
# SSH into VPS
ssh user@your-vps.com

# Install Docker
curl -sSL https://get.docker.com | sh

# Clone repo
git clone https://github.com/DragonslayerTom/Sale-Finder.git
cd Sale-Finder

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Access
# Frontend: http://your-vps.com:3000
# API: http://your-vps.com:8000
# Docs: http://your-vps.com:8000/docs
```

---

## Monitoring

After deployment:

```bash
# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale api=3
```

---

## Performance Tuning

### Frontend
- Vite build output: 260KB
- Gzipped: 84KB
- Cache strategies: Browser cache 1 day

### Backend
- FastAPI: 1-10ms response time
- Connection pooling: 20 connections
- Database indexes on: name, category, price

### Database
- PostgreSQL 15
- Auto-backup (if on managed platform)
- Connection pooling via SQLAlchemy

---

## Cost Estimates (2026)

| Platform | Cost |
|----------|------|
| Railway (basic) | $5-10/month |
| Heroku (free tier gone) | $7-50/month |
| Render (starter) | $7/month |
| AWS/GCP | $10-100+/month |
| Self-hosted VPS | $5-20/month |

**Recommendation:** Railway or Render for easiest setup + lowest cost.
