# AI Cyber Threat Detection - Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- npm installed

## Installation

```bash
npm install
```

## Running the Application

### Option 1: Run Both Services Together (Recommended)
```bash
npm run dev
```
This runs both the frontend (Vite on port 3000) and backend (Express on port 5000) concurrently.

### Option 2: Run Services Separately

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```
Expected output:
```
ThreatVerse API listening on http://localhost:5000
```

**Terminal 2 - Frontend Client:**
```bash
npm run dev:client
```
Expected output:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
```

## Health Check - Backend API

**One-liner to verify backend is running:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{"status":"ok","service":"ThreatVerse API"}
```

**If it fails:**
- Backend not running → start `npm run dev:server`
- Wrong port → check if port 5000 is in use
- Connection refused → backend crashed, check Terminal 1 for errors

## Frontend URL

Once both services are running:
```
http://localhost:3000
```

## Demo Credentials

Use any of these accounts to login:

| Email | Password | Role |
|-------|----------|------|
| admin@threatverse.io | demo | Admin |
| analyst@threatverse.io | demo | Analyst |
| viewer@threatverse.io | demo | Viewer |

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:

**Kill process on port 3000:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**Kill process on port 5000:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend Cannot Reach Backend
Run the health check:
```bash
curl http://localhost:5000/api/health
```

If it fails:
1. Check that backend is actually running (`npm run dev:server`)
2. Check the terminal output for errors
3. Verify port 5000 is not blocked by firewall

### Clear Cache & Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Preview the build:
```bash
npm run preview
```
