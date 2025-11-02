#!/usr/bin/env node

/**
 * MongoDB Setup Helper Script
 * This script helps you set up MongoDB for HobbyHub
 */

import readline from "readline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

console.log("\n🚀 HobbyHub MongoDB Setup Helper\n");
console.log("This script will help you configure your MongoDB connection.\n");
console.log("You have two options:");
console.log("1. MongoDB Atlas (Cloud) - Recommended, free tier available");
console.log("2. Local MongoDB - Requires installation on your computer\n");

async function setup() {
  try {
    const choice = await question("Choose an option (1 or 2): ");

    const envPath = path.join(__dirname, "server", ".env");
    let envContent = "";

    if (choice === "1") {
      console.log("\n📝 MongoDB Atlas Setup");
      console.log("\nTo get your connection string:");
      console.log("1. Go to https://www.mongodb.com/cloud/atlas");
      console.log("2. Sign up (free) and create a cluster");
      console.log('3. Click "Connect" → "Connect your application"');
      console.log("4. Copy the connection string\n");

      const connectionString = await question(
        "Paste your MongoDB Atlas connection string: "
      );

      // Replace <password> if it exists
      let mongoUri = connectionString.trim();
      if (mongoUri.includes("<password>")) {
        const password = await question("Enter your database password: ");
        mongoUri = mongoUri.replace("<password>", password);
      }

      // Ensure database name
      if (!mongoUri.includes("/hobbyhub")) {
        mongoUri = mongoUri.replace(/\?retryWrites/, "/hobbyhub?retryWrites");
      }

      const jwtSecret =
        (await question("Enter a JWT secret (or press Enter for default): ")) ||
        "your-super-secret-jwt-key-change-this-in-production-" + Date.now();

      envContent = `# MongoDB Configuration - Atlas
MONGO_URI=${mongoUri}
JWT_SECRET=${jwtSecret}
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
`;
    } else if (choice === "2") {
      console.log("\n📝 Local MongoDB Setup");
      console.log(
        "\nMake sure MongoDB is installed and running on your computer."
      );
      console.log("Default connection: mongodb://localhost:27017/hobbyhub\n");

      const useDefault = await question(
        "Use default local connection? (y/n): "
      );

      let mongoUri;
      if (useDefault.toLowerCase() === "y") {
        mongoUri = "mongodb://localhost:27017/hobbyhub";
      } else {
        mongoUri = await question(
          "Enter your local MongoDB connection string: "
        );
      }

      const jwtSecret =
        (await question("Enter a JWT secret (or press Enter for default): ")) ||
        "your-super-secret-jwt-key-change-this-in-production-" + Date.now();

      envContent = `# MongoDB Configuration - Local
MONGO_URI=${mongoUri}
JWT_SECRET=${jwtSecret}
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
`;
    } else {
      console.log("Invalid choice. Exiting...");
      rl.close();
      return;
    }

    // Write to .env file
    fs.writeFileSync(envPath, envContent);
    console.log("\n✅ Configuration saved to server/.env");
    console.log("\n📋 Next steps:");
    console.log("1. Verify your MongoDB connection string is correct");
    console.log("2. Run: npm run dev");
    console.log('3. Check the console for "MongoDB Connected" message\n');

    rl.close();
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    rl.close();
  }
}

setup();
