// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         const uri = process.env.DATABASE_URL;
//         console.log(`URI: ${uri}`);

//         if (!uri) throw new Error("DATABASE_URL is not defined in .env");

//         await mongoose.connect(uri);
//         console.log("✅ Database connected");
//     } catch (error) {
//         console.error("❌ DB connection error:", error);
//         throw error;
//     }
// };

// config/db.ts
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
    dbName: process.env.DB_NAME, // jika DB name tidak ditulis di path URL
  });
  console.log('MongoDB connected');
}

