# Deploy to Railway in 5 Minutes

## Prerequisites
- GitHub account
- Railway account (free)

## Step-by-Step

### 1. Go to Railway Dashboard
Visit: https://railway.app/dashboard

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Click "Connect GitHub"
- Authorize OpenClaw (or DragonslayerTom account)

### 3. Select Repository
- Find `DragonslayerTom/Sale-Finder`
- Click to select
- Railway auto-detects Dockerfile and docker-compose

### 4. Configure Services
Railway will show 3 services to deploy:
1. **Frontend** (React + Vite)
   - Port: 3000
   - Build: `npm install && npm run build`
   - Start: `npm run dev`

2. **API** (FastAPI)
   - Port: 8000
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 8000`

3. **PostgreSQL** (Database)
   - Auto-managed
   - Railway creates DATABASE_URL automatically

### 5. Set Environment Variables
Railway auto-fills from `railway.json`:
- `DATABASE_URL` → auto from Postgres
- `ENVIRONMENT` → production

**No additional setup needed!**

### 6. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Watch build logs in real-time

### 7. Get Live URLs
After deployment, Railway shows:
```
Frontend: https://sale-finder-web-[random].up.railway.app
API: https://sale-finder-api-[random].up.railway.app
Database: Managed internally
```

### 8. Test
- Visit frontend URL
- Search for a product
- Check API health: https://api-url/health
- View API docs: https://api-url/docs

---

## Troubleshooting

**Build Failed?**
- Check backend `requirements.txt` exists
- Check frontend `package.json` exists
- View logs: Railway → Deployments → Logs

**Database Connection Error?**
- Railway auto-creates `DATABASE_URL`
- Verify it's set in Variables
- Restart service: Railway → Service → Restart

**Frontend Can't Call API?**
- Update CORS in `backend/main.py`:
  ```python
  allow_origins=["https://sale-finder-web-[your-url].up.railway.app"]
  ```
- Redeploy

---

## Costs

**Railway Free Tier:**
- $5 free credit/month
- Includes: 1 web service + 1 database
- After: ~$10-20/month for your setup

**Estimate for Deal Aggregator:**
- Frontend: 1 dyno = $5-10/mo
- API: 1 dyno = $5-10/mo
- PostgreSQL: Hobby tier = $9/mo
- **Total: ~$20-30/month**

---

## Next Steps

1. **Go live** → https://railway.app/dashboard
2. **Connect GitHub** → authorize
3. **Select repo** → DragonslayerTom/Sale-Finder
4. **Deploy** → click Deploy button
5. **Share links** → frontend + API URLs work!

That's it! 🚀
