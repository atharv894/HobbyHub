# MongoDB Setup Guide for HobbyHub

This guide will help you set up MongoDB for your HobbyHub application. You have two main options:

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

MongoDB Atlas is free and perfect for development and deployment. It's the easiest option.

### Steps:

1. **Create a MongoDB Atlas Account**

   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and sign up (it's free!)

2. **Create a New Cluster**

   - After signing up, click "Build a Database"
   - Choose the **FREE** (M0) tier
   - Select a cloud provider and region (choose one closest to you)
   - Click "Create"

3. **Set Up Database Access**

   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username (e.g., `hobbyhub_admin`)
   - Generate a secure password (click "Autogenerate Secure Password" or create your own)
   - **IMPORTANT:** Copy and save the password - you'll need it!
   - Select "Atlas Admin" for user privileges
   - Click "Add User"

4. **Configure Network Access**

   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
   - For production: Add your specific IP addresses
   - Click "Confirm"

5. **Get Your Connection String**

   - Go back to "Database" (or "Clusters")
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with the password you created in step 3
   - Optionally replace `<username>` if you used a different username

6. **Update Your .env File**
   - Open `server/.env` (create it if it doesn't exist)
   - Update `MONGO_URI` with your connection string:
   ```env
   MONGO_URI=mongodb+srv://hobbyhub_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hobbyhub?retryWrites=true&w=majority
   ```
   - Replace:
     - `hobbyhub_admin` with your actual username
     - `YOUR_PASSWORD` with your actual password
     - `cluster0.xxxxx.mongodb.net` with your actual cluster URL
     - The `/hobbyhub` part is your database name (you can change this)

### Example .env file:

```env
MONGO_URI=mongodb+srv://hobbyhub_admin:MySecurePass123@cluster0.abc123.mongodb.net/hobbyhub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
PORT=5000
```

---

## Option 2: Local MongoDB Installation

If you prefer to run MongoDB locally on your computer.

### Windows:

1. **Download MongoDB Community Server**

   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select Windows, choose "MSI" package
   - Download and run the installer

2. **Install MongoDB**

   - Run the installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (optional, but helpful GUI tool)
   - Complete the installation

3. **Verify Installation**

   - MongoDB should start automatically as a service
   - You can check in Services (search "services" in Windows)
   - Look for "MongoDB" service - it should be running

4. **Update Your .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017/hobbyhub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

### macOS (using Homebrew):

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

Update `.env`:

```env
MONGO_URI=mongodb://localhost:27017/hobbyhub
```

### Linux (Ubuntu/Debian):

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

Update `.env`:

```env
MONGO_URI=mongodb://localhost:27017/hobbyhub
```

---

## Testing Your Connection

1. Make sure your `server/.env` file is set up correctly
2. Start your server:
   ```bash
   npm run server
   ```
3. You should see: `MongoDB Connected: ...` in the console
4. If you see an error, double-check:
   - Your connection string is correct
   - Your MongoDB service is running (for local)
   - Network access is configured (for Atlas)
   - Username and password are correct

---

## Common Issues & Solutions

### Issue: "Authentication failed"

- **Solution:** Double-check your username and password in the connection string
- Make sure there are no special characters in the password that need URL encoding (use `%` encoding if needed)

### Issue: "Connection timeout" (Atlas)

- **Solution:** Make sure your IP address is whitelisted in Network Access settings
- Try "Allow Access from Anywhere" temporarily for testing

### Issue: "Cannot connect to MongoDB" (Local)

- **Solution:** Check if MongoDB service is running:
  - Windows: Check Services app
  - macOS: `brew services list`
  - Linux: `sudo systemctl status mongod`

### Issue: Port already in use

- **Solution:** MongoDB uses port 27017 by default. Make sure nothing else is using it:

  ```bash
  # Windows
  netstat -ano | findstr :27017

  # macOS/Linux
  lsof -i :27017
  ```

---

## Which Option Should You Choose?

- **MongoDB Atlas (Cloud):**

  - ✅ Best for beginners
  - ✅ No installation required
  - ✅ Works anywhere
  - ✅ Perfect for deployment
  - ✅ Free tier available
  - ✅ Automatic backups

- **Local MongoDB:**
  - ✅ No internet required
  - ✅ Faster for local development
  - ✅ Full control
  - ❌ Requires installation
  - ❌ Need to manage yourself

**Recommendation:** Start with MongoDB Atlas - it's easier and works great for both development and production!

---

## Next Steps

Once MongoDB is set up:

1. ✅ Create `server/.env` file with your `MONGO_URI`
2. ✅ Install dependencies: `npm run install-all`
3. ✅ Start the server: `npm run dev`
4. ✅ You're ready to go!

The database and collections will be created automatically when you first run the application.
