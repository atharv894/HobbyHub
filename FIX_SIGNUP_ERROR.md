# 🔧 Fixing "Request failed with status code 500" Error

## Quick Diagnosis Steps

### Step 1: Check Server Logs

The most important thing is to see what error the server is actually throwing.

1. Look at the terminal where you ran `npm run dev`
2. Try signing up again
3. Look for any error messages in the server console
4. Common errors you might see:
   - `MongoServerError: ...` → MongoDB issue
   - `JWT_SECRET is required` → Missing JWT secret
   - `Cannot read property...` → Code issue
   - `ValidationError` → Invalid data

### Step 2: Verify Environment Variables

Your `.env` file should have:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=a-random-secure-string-here
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Important:** JWT_SECRET should NOT be "your-super-secret-jwt-key-change-this-in-production"

### Step 3: Test MongoDB Connection

```bash
npm run test-db
```

This will tell you if MongoDB is actually connected.

### Step 4: Most Common Causes

1. **MongoDB Not Connected**

   - Check if you see "MongoDB Connected" when server starts
   - Run `npm run test-db` to verify

2. **JWT_SECRET Missing or Invalid**

   - Make sure JWT_SECRET is set in `.env`
   - It should be a random string (not the default placeholder)

3. **MongoDB Connection String Issue**

   - Check if connection string has special characters properly encoded
   - Make sure password in connection string is correct

4. **Server Crash During User Creation**
   - Check server logs for specific error
   - Could be validation error or database constraint

---

## Quick Fix Steps

1. **Stop the server** (Ctrl+C)

2. **Check/Update JWT_SECRET:**

   ```bash
   cd server
   # Open .env file and make sure JWT_SECRET has a value
   # Generate a random one if needed
   ```

3. **Test MongoDB:**

   ```bash
   cd ..
   npm run test-db
   ```

4. **Restart server:**

   ```bash
   npm run dev
   ```

5. **Watch the server logs** when you try to sign up - the actual error will be there!

---

## If You Still See 500 Error

Share the EXACT error message from the server console, and I'll help you fix it!
