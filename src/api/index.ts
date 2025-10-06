// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import { app } from '../server';
import { connectDB } from '../config/db';

// Cache promise supaya tidak connect berkali-kali di Lambda
let dbReady: Promise<void> | null = null;
function ensureDB() {
  if (!dbReady) {
    dbReady = connectDB().catch((err) => {
      console.error('MongoDB connection failed:', err);
      throw err;
    });
  }
  return dbReady;
}

const handler = serverless(app);

export default async function (req: VercelRequest, res: VercelResponse) {
  await ensureDB();     // pastikan DB siap
  return handler(req as any, res as any);
}
