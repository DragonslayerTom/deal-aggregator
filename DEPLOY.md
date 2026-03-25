# Deploy to Railway

## Prerequisites

1. Railway account: https://railway.app (free tier OK)
2. Git (for pushing code)
3. GitHub account (for repo)

## Step 1: Initialize Git

```bash
cd deal-aggregator

# Create git repo
git init
git add .
git commit -m "Initial commit: Deal Aggregator MVP"

# Create GitHub repo (via web UI)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/deal-aggregator.git
git branch -M main
git push -u origin main
```

## Step 2: Install Railway CLI

```bash
# macOS
brew install railwayapp/railway/railway

# Linux
curl -fsSL cli.railway.app/install.sh | bash

# Windows
iex (iwr cli.railway.app/install.ps1 -UseBasicParsing).Content
```

## Step 3: Deploy Backend

```bash
# Login
railway login

# Create project
railway init
# Choose: Create new project
# Name: deal-aggregator

# Add PostgreSQL service
railway add
# Choose: PostgreSQL

# Configure environment
railway variables set SECRET_KEY=your-secret-key-here
railway variables set DEBUG=false

# Deploy backend
cd backend
railway service rename backend
railway up

# Get API URL
railway open
# Note the deployment URL: https://deal-aggregator-production.railway.app
```

## Step 4: Deploy Frontend

```bash
cd ../frontend

# Add Node service
railway service create
# Name: frontend
# Runtime: Node.js

# Set environment
railway variables set VITE_API_URL=https://deal-aggregator-production.railway.app/api

# Deploy
railway up

# Get frontend URL
railway open
# Your app is live at: https://deal-aggregator-frontend-production.railway.app
```

## Step 5: Test

```bash
# Backend
curl https://deal-aggregator-production.railway.app/health
# Response: {"status":"ok"}

# Frontend
# Open: https://deal-aggregator-frontend-production.railway.app
```

## Step 6: Enable Auto-Deploy

In Railway dashboard:
1. Go to your project
2. Select backend service
3. Settings → GitHub → Connect repo
4. Enable "Auto-deploy on push"

Now every `git push` redeploys automatically.

## Database Migrations

Migrations run automatically on deploy via:
```python
# main.py
Base.metadata.create_all(bind=engine)
```

## Custom Domain

In Railway dashboard:
1. Project Settings
2. Custom Domain
3. Add: api.yourdomain.com

Point your DNS:
```
CNAME → your-railway-url.railway.app
```

## Logs

```bash
railway logs --tail
```

## Rollback

If deployment breaks:
```bash
railway rollback <deployment-id>
```

## Cost

- Free tier: 5 PST/month (enough for 1 app)
- Paid: ~$5/month per service ($15 total for API + DB + Frontend)

## Done!

Your Deal Aggregator is now live in production with:
✅ HTTPS
✅ Auto-scaling
✅ Database backups
✅ Monitoring
✅ CI/CD (via GitHub)
