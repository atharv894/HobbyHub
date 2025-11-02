#!/usr/bin/env node

/**
 * MongoDB Connection Tester
 * This script tests your MongoDB connection string
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.join(__dirname, 'server', '.env');

if (!fs.existsSync(envPath)) {
  console.error('\n❌ Error: server/.env file not found!');
  console.log('\n📝 To create it:');
  console.log('1. Copy server/env.template to server/.env');
  console.log('2. Or run: npm run setup-db\n');
  process.exit(1);
}

dotenv.config({ path: envPath });

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('\n❌ Error: MONGO_URI not found in server/.env');
  console.log('\n📝 Make sure your .env file contains:');
  console.log('MONGO_URI=your-connection-string\n');
  process.exit(1);
}

console.log('\n🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', mongoUri.replace(/:[^:@]+@/, ':****@')); // Hide password

async function testConnection() {
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    
    console.log('\n✅ SUCCESS! MongoDB Connected');
    console.log('📍 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('🔌 Ready State:', conn.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\n📁 Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (database will be created on first use)');
    
    await mongoose.disconnect();
    console.log('\n✅ Connection test completed successfully!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!\n');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    
    if (error.message.includes('authentication')) {
      console.log('• Check your username and password');
      console.log('• Make sure special characters in password are URL-encoded');
      console.log('• Verify database user exists in MongoDB Atlas');
    } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
      console.log('• Check your connection string format');
      console.log('• For Atlas: Make sure your IP is whitelisted');
      console.log('• For Local: Make sure MongoDB service is running');
      console.log('• Check network/firewall settings');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('• Invalid cluster URL');
      console.log('• Check your Atlas cluster is active');
    } else {
      console.log('• Verify your MONGO_URI in server/.env');
      console.log('• Check MONGODB_SETUP.md for detailed instructions');
    }
    
    console.log('\n');
    process.exit(1);
  }
}

testConnection();

