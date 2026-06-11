# Deploying Fish for President to Vercel

## Prerequisites
- GitHub account with this repo pushed
- Vercel account (free at https://vercel.com)

## Quick Deploy

### Option 1: Connect GitHub (Easiest)
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Connect your GitHub account and select this repo
4. Vercel auto-detects settings (uses `vercel.json`)
5. Click "Deploy"

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## What's Configured

- **vercel.json**: Routes all requests through Node.js serverless function
- **api/index.js**: Serves static files (HTML, CSS, JS, images, etc.)
- **package.json**: Updated with build and start scripts

## Project Structure for Vercel

```
Fish for President/
├── vercel.json              ← Deployment config
├── api/
│   └── index.js            ← Serverless function handler
├── package.json            ← Updated for Vercel
├── index.html              ← Entry point
├── src/                    ← Game source files
├── scripts/
│   └── server.mjs          ← Local dev server (not used on Vercel)
└── assets/                 ← Static assets
```

## Local Testing (matches Vercel environment)

```bash
npm install
npm start
# Opens http://localhost:3000 (or your PORT)
```

## How It Works

1. Vercel receives request for `/` → calls serverless function
2. API handler (`api/index.js`) receives request
3. Reads corresponding file from disk (index.html, src/app.js, etc.)
4. Returns file with proper content-type header
5. Browser caches for 1 hour (`Cache-Control: public, max-age=3600`)

## Troubleshooting

**"Cannot find module"**
- Make sure all imports use correct paths
- Check `src/` files are included in git

**"404 Not Found"**
- Vercel serves from project root
- Paths must match file structure exactly

**Save data persists?**
- localStorage works on Vercel (client-side only)
- No server session storage needed

## Domain Setup

After first deploy:
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your custom domain (e.g., fishforpresident.com)
4. Point DNS records as instructed

## Environment Variables (if needed later)

Add to Vercel dashboard:
1. Project Settings → Environment Variables
2. Add key-value pairs
3. They'll be available in serverless functions via `process.env.KEY_NAME`

---

**Your game will be live at:** `https://your-project-name.vercel.app`
