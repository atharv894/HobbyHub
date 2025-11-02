# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm run install-all
```

## Step 2: Set Up MongoDB

### Option A: Interactive Setup (Easiest)

```bash
npm run setup-db
```

This will guide you through the MongoDB setup process.

### Option B: Manual Setup

1. **Create MongoDB Atlas account** (recommended):
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a cluster (choose FREE tier)
   - Create a database user (username + password)
   - Whitelist IP address (allow from anywhere for development)
   - Get connection string from "Connect" button

2. **Edit `server/.env`**:
   - Open `server/.env` file
   - Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual MongoDB Atlas values
   
   OR if using local MongoDB:
   - Uncomment the local MongoDB line
   - Comment out the Atlas line

3. **Set JWT Secret**:
   - Replace the JWT_SECRET with a random string (important for security!)

## Step 3: Start the Application

```bash
npm run dev
```

This starts both frontend (port 5173) and backend (port 5000).

## Step 4: Verify Connection

Look for this message in the console:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

If you see an error:
- Check your `server/.env` file
- Verify your MongoDB connection string
- Make sure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0 for development)

## Step 5: Open Your Browser

Go to: http://localhost:5173

You should see the HobbyHub homepage!

---

## Need Help?

- See `MONGODB_SETUP.md` for detailed MongoDB instructions
- See `README.md` for full documentation

---

## Common First-Time Issues

### "Cannot find module"
```bash
npm run install-all
```

### "MongoDB connection failed"
- Check `server/.env` file exists and has correct connection string
- For Atlas: Make sure IP is whitelisted
- For Local: Make sure MongoDB service is running

### "Port already in use"
- Make sure ports 5173 (frontend) and 5000 (backend) are available
- Close other applications using these ports

