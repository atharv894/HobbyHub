# 🔧 Troubleshooting Guide

## Signup/Login Issues

### "Signup failed" or "Login failed"

#### Check 1: Is the backend server running?

```bash
# Make sure you see the server output:
npm run dev
```

You should see:

```
✅ MongoDB Connected: ...
Server running on port 5000
```

If you see MongoDB connection errors, see MongoDB setup below.

#### Check 2: Check browser console

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Try signing up again
4. Look for any error messages

Common errors:

- `Network Error` or `ERR_CONNECTION_REFUSED` → Backend not running
- `CORS error` → CORS configuration issue
- `500 Internal Server Error` → Backend error (check server logs)

#### Check 3: Check server logs

Look at the terminal where `npm run dev` is running.

Common errors:

- `MongoDB connection failed` → MongoDB not connected
- `JWT_SECRET is required` → Missing .env file
- `ValidationError` → Invalid input data

#### Check 4: Verify MongoDB connection

```bash
npm run test-db
```

This will test if MongoDB is properly configured.

---

## MongoDB Connection Issues

### Error: "MongoDB connection failed"

1. **Check your .env file exists:**

   ```bash
   # Windows
   type server\.env

   # Mac/Linux
   cat server/.env
   ```

2. **Verify MONGO_URI format:**

   - Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/hobbyhub?retryWrites=true&w=majority`
   - Local: `mongodb://localhost:27017/hobbyhub`

3. **Test connection:**

   ```bash
   npm run test-db
   ```

4. **For Atlas:**

   - Check IP whitelist (Network Access in Atlas)
   - Verify username and password
   - Check cluster is running

5. **For Local:**
   - Make sure MongoDB service is running
   - Check port 27017 is not blocked

---

## Port Already in Use

### Error: "Port 5000 already in use"

**Windows:**

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number shown)
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
# Find process
lsof -i :5000

# Kill process (replace PID)
kill -9 <PID>
```

Or change the port in `server/.env`:

```env
PORT=5001
```

---

## CORS Errors

### Error: "CORS policy blocked"

1. Check `server/.env`:

   ```env
   CLIENT_URL=http://localhost:5173
   ```

2. Make sure frontend is running on port 5173

3. Clear browser cache and cookies

---

## Module Not Found Errors

### Error: "Cannot find module"

```bash
# Reinstall dependencies
npm run install-all
```

If that doesn't work:

```bash
# Delete node_modules and reinstall
rm -rf node_modules server/node_modules client/node_modules
# Or on Windows:
rmdir /s node_modules server\node_modules client\node_modules

npm run install-all
```

---

## Common Issues & Solutions

### Issue: "User already exists"

- **Solution:** The email is already registered. Try logging in instead, or use a different email.

### Issue: "Password must be at least 6 characters"

- **Solution:** Enter a password with 6 or more characters.

### Issue: "Invalid credentials" (Login)

- **Solution:** Check email and password are correct. Passwords are case-sensitive.

### Issue: Server starts but no connection to MongoDB

- **Solution:**
  1. Check `server/.env` file exists and has correct MONGO_URI
  2. Run `npm run test-db` to verify connection
  3. Check MongoDB Atlas cluster is running (for cloud)
  4. Check MongoDB service is running (for local)

### Issue: "Cannot read property 'user' of undefined"

- **Solution:** Backend might not be sending proper response. Check server logs for errors.

---

## Getting More Detailed Error Messages

### Enable Detailed Logging

**Backend:** Errors are already logged to console when you run `npm run dev`

**Frontend:** Open browser DevTools Console (F12) to see detailed errors

---

## Still Having Issues?

1. **Check all files exist:**

   - `server/.env` (with MONGO_URI, JWT_SECRET)
   - `server/package.json`
   - All model files in `server/models/`

2. **Verify ports:**

   - Frontend: 5173
   - Backend: 5000
   - MongoDB: 27017 (local) or Atlas

3. **Check Node.js version:**

   ```bash
   node --version
   ```

   Should be v16 or higher.

4. **Try restarting everything:**
   ```bash
   # Stop all processes (Ctrl+C)
   # Then restart
   npm run dev
   ```

---

## Quick Diagnostic Commands

```bash
# Test MongoDB connection
npm run test-db

# Check if ports are in use
# Windows:
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Mac/Linux:
lsof -i :5000
lsof -i :5173

# Check Node version
node --version

# Check if dependencies are installed
cd server && npm list
cd ../client && npm list
```
