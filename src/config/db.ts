// src/config/db.ts
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('Missing DATABASE_URL');

  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2) {
    await new Promise((r) => mongoose.connection.once('connected', r));
    return;
  }

  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME,           // optional (isi kalau URL kamu tidak punya path db)
    serverSelectionTimeoutMS: 10_000,      // ⬅️ gagal cepat (10 detik)
    socketTimeoutMS: 45_000                // ⬅️ jangan nunggu terlalu lama
  });

  console.log('MongoDB connected');
}
