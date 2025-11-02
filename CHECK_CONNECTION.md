# 🔍 How to Check Your MongoDB Connection String

## Method 1: Check Your .env File (Easiest)

1. Open `server/.env` file
2. Look for the line that starts with `MONGO_URI=`
3. Your connection string should look like one of these:

   **For MongoDB Atlas:**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hobbyhub?retryWrites=true&w=majority
   ```

   **For Local MongoDB:**
   ```
   mongodb://localhost:27017/hobbyhub
   ```

---

## Method 2: Test Your Connection (Recommended)

Run this command to test if your connection string works:

```bash
npm run test-db
```

This will:
- ✅ Show your connection string (with password hidden)
- ✅ Test the connection
- ✅ Show database information if connected
- ❌ Show error messages with troubleshooting tips if it fails

---

## Method 3: Get Connection String from MongoDB Atlas

If you need to get/create your connection string:

### Step 1: Log into MongoDB Atlas
- Go to https://cloud.mongodb.com
- Log in to your account

### Step 2: Go to Your Cluster
- Click on your cluster name (or "Deploy a free cluster" if you haven't created one)

### Step 3: Get Connection String
1. Click the **"Connect"** button
2. Choose **"Connect your application"**
3. Select **"Node.js"** as the driver
4. Select the latest version (4.1 or later)
5. Copy the connection string shown

It will look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 4: Update the Connection String
Replace these parts:
- `<username>` → Your database username
- `<password>` → Your database password
- Add `/hobbyhub` before `?retryWrites` to specify the database name

**Example:**
```
mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/hobbyhub?retryWrites=true&w=majority
```

### Step 5: Check Network Access
Make sure your IP is whitelisted:
1. In Atlas, go to **"Network Access"**
2. Check if your IP is listed (or `0.0.0.0/0` for development)
3. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"** for testing

---

## Method 4: View Connection String in Terminal

When you start your server, it will show connection status:

```bash
npm run dev
```

Look for:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

Or if there's an error, it will show what's wrong.

---

## Common Connection String Formats

### MongoDB Atlas (Cloud)
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

### Local MongoDB
```
mongodb://localhost:27017/DATABASE
```

---

## Troubleshooting

### "Connection string not found"
- Make sure `server/.env` file exists
- Check it contains `MONGO_URI=...`

### "Authentication failed"
- Check username and password are correct
- Make sure special characters in password are URL-encoded (use `%` codes)
  - Example: `@` becomes `%40`, `#` becomes `%23`

### "Connection timeout"
- For Atlas: Check Network Access (IP whitelist)
- For Local: Make sure MongoDB service is running

### "Invalid connection string format"
- Make sure there are no extra spaces
- Check quotes are removed if copying from somewhere
- Verify format matches examples above

---

## Quick Check Commands

```bash
# Test connection
npm run test-db

# View .env file (Windows)
type server\.env

# View .env file (Mac/Linux)
cat server/.env
```

---

## Still Having Issues?

1. Run `npm run test-db` to see specific error messages
2. Double-check your `.env` file format
3. See `MONGODB_SETUP.md` for detailed setup instructions

