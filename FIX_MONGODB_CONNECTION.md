# 🔧 Fix MongoDB Connection Error

## The Error You're Seeing:

```
Error: connect ECONNREFUSED 127.0.0.1:27017
Operation users.findOne() buffering timed out after 10000ms
```

**This means:** Your app is trying to connect to **LOCAL MongoDB** (localhost:27017), but it's not running.

---

## ✅ Solution: Use MongoDB Atlas (Cloud)

Since you don't have local MongoDB installed, use MongoDB Atlas instead:

### Step 1: Get MongoDB Atlas Connection String

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up/Log in** (free account works perfectly)
3. **Create a cluster** (choose FREE tier M0)
4. **Set up database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save them!)
   - Set privileges to "Atlas Admin"
5. **Whitelist IP address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
6. **Get connection string:**
   - Go back to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### Step 2: Update Your .env File

1. **Open:** `server/.env`
2. **Replace the MONGO_URI line** with your Atlas connection string:

**Format:**

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/hobbyhub?retryWrites=true&w=majority
```

**Example:**

```env
MONGO_URI=mongodb+srv://hobbyhub_user:MyPass123@cluster0.abc123.mongodb.net/hobbyhub?retryWrites=true&w=majority
```

**Important:**

- Replace `YOUR_USERNAME` with your database username
- Replace `YOUR_PASSWORD` with your database password
- Replace `YOUR_CLUSTER` with your actual cluster URL
- Make sure `/hobbyhub` is in the path (this is your database name)

### Step 3: Test the Connection

```bash
npm run test-db
```

You should see:

```
✅ SUCCESS! MongoDB Connected
```

### Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

You should see:

```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

### Step 5: Try Signup Again

The signup should now work! ✅

---

## Alternative: Install Local MongoDB

If you prefer local MongoDB:

### Windows:

1. Download from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run as a Windows service automatically
4. Keep your `.env` as:
   ```env
   MONGO_URI=mongodb://localhost:27017/hobbyhub
   ```

### But MongoDB Atlas is MUCH easier! ⭐

---

## Quick Checklist:

- [ ] MongoDB Atlas account created
- [ ] Database user created (username + password)
- [ ] IP address whitelisted (or allow from anywhere)
- [ ] Connection string copied
- [ ] `server/.env` updated with Atlas connection string
- [ ] `npm run test-db` shows success
- [ ] Server restarted
- [ ] Try signup again

---

## Still Having Issues?

1. **Verify connection string format** - Make sure no extra spaces
2. **Check password has special characters** - May need URL encoding
3. **Verify IP is whitelisted** in Atlas Network Access
4. **Check server logs** for specific error messages

Run `npm run test-db` to see detailed error messages!
