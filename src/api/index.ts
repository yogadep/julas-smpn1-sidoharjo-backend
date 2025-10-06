// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import { app } from '../server';
import { connectDB } from '../config/db';

// Gunakan singleton Promise agar cold start connect sekali, lalu reuse.
let dbReady: Promise<void> | null = null;
function ensureDB() {
  if (!dbReady) {
    dbReady = connectDB().catch((err) => {
      // Log error agar muncul di Vercel Logs
      console.error('MongoDB connection failed:', err);
      // Propagate supaya 500 terlihat jelas
      throw err;
    });
  }
  return dbReady;
}

const handler = serverless(app);

export default async function (req: VercelRequest, res: VercelResponse) {
  await ensureDB();           // ⟵ pastikan DB tersambung dulu
  return handler(req as any, res as any);
}
