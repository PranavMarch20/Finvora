import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';
import { DatabaseSync } from 'node:sqlite';
import { getMigrations } from 'better-auth/db/migration';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqliteFilePath = path.join(dataDir, 'auth.sqlite');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finovara';
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || 'finovara-better-auth-secret-key-32chars-minimum-for-security';
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || 'http://localhost:5000';

const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
export const isGoogleConfigured = Boolean(
  googleClientId && 
  googleClientSecret && 
  !googleClientId.includes('your_') && 
  !googleClientId.includes('dummy')
);

// Determine database adapter
let databaseConfig;
let authDbDriver = 'SQLite (Local)';

try {
  const mongoClient = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
  await mongoClient.connect();
  databaseConfig = mongodbAdapter(mongoClient.db(), { client: mongoClient });
  authDbDriver = 'MongoDB';
  console.log('✅ Better Auth initialized with MongoDB adapter:', MONGODB_URI);
} catch (err) {
  authDbDriver = 'SQLite (Fallback)';
  console.warn(`⚠️  MongoDB not available for Better Auth (${err.message}). Using SQLite fallback: ${sqliteFilePath}`);
  const sqliteDb = new DatabaseSync(sqliteFilePath);
  databaseConfig = sqliteDb;
}

// Build socialProviders
const socialProviders = {};
if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret
  };
} else {
  // Provide dummy credentials so Better Auth router recognizes the provider without throwing at boot
  socialProviders.google = {
    clientId: 'google-client-id-pending-config',
    clientSecret: 'google-client-secret-pending-config'
  };
}

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
  database: databaseConfig,
  trustedOrigins: [
    'http://localhost:3055',
    'http://127.0.0.1:3055',
    'http://localhost:5000',
    'http://127.0.0.1:5000'
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    autoSignIn: true
  },
  socialProviders
});

// Run migrations if using SQLite
if (authDbDriver.startsWith('SQLite')) {
  try {
    const { runMigrations } = await getMigrations(auth.options);
    await runMigrations();
    console.log('✅ Better Auth SQLite schema ready.');
  } catch (migErr) {
    console.error('Better Auth migration warning:', migErr.message);
  }
}

export { authDbDriver };

