// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { connectDB } from './config/db';
// import userRouter from './router/user.routes';
// import authRouter from './router/auth.routes';
// import mapelRouter from './router/mapel.routes';
// import kelasRouter from './router/kelas.routes';
// import siswaRouter from './router/siswa.routes';
// import jurnalRouter from './router/jurnal.routes';
// import jadwalRouter from './router/jadwal.routes';

// dotenv.config(); 

// const app = express();
// const port = process.env.PORT || 3000;

// // CORS Configuration
// const corsOptions = {
//     origin: process.env.NODE_ENV === 'production' 
//       ? ['https://your-production-domain.com'] 
//       : ['http://localhost:3000', 'http://localhost:5173'], 
//     credentials: true, 
//     optionsSuccessStatus: 204
//   };

// app.use(cors(corsOptions));
// app.use(express.json());

// app.use('/api', userRouter);
// app.use('/api', authRouter);
// app.use('/api', mapelRouter);
// app.use('/api', kelasRouter);
// app.use('/api', siswaRouter);
// app.use('/api', jurnalRouter);
// app.use('/api', jadwalRouter);

// if (process.env.NODE_ENV !== 'production') {
//     const startServer = async (): Promise<void> => {
//         try {
//             await connectDB();
//             app.listen(port, () => {
//                 console.log(`App listening on port: ${port}`);
//             });
//         } catch (error: any) {
//             console.error(`Gagal terhubung ke server: ${error.message}`);
//         }
//     };

//     startServer();
// }

// export { app };

// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

import userRouter from './router/user.routes';
import authRouter from './router/auth.routes';
import mapelRouter from './router/mapel.routes';
import kelasRouter from './router/kelas.routes';
import siswaRouter from './router/siswa.routes';
import jurnalRouter from './router/jurnal.routes';
import jadwalRouter from './router/jadwal.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// --- CORS ---
// app.use(cors({
//   origin(origin, cb) {
//     const ok =
//       !origin ||
//       /^https?:\/\/localhost:(3000|5173)$/.test(origin || '') ||
//       /\.vercel\.app$/.test(origin || '');
//     cb(ok ? null : new Error('Not allowed by CORS'), ok);
//   },
//   credentials: true,
//   optionsSuccessStatus: 204
// }));

// CORS configuration yang lebih simple
app.use(cors({
  origin: [
    'https://julas-smpn1-sidoharjo-frontend-zpdv.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// (opsional) timeout per-request biar nggak ngegantung 5 menit
app.use((req, res, next) => {
  req.setTimeout(20_000, () => {
    console.warn('Request timeout:', req.method, req.url);
    if (!res.headersSent) res.status(504).send('Gateway Timeout');
  });
  next();
});

// --- ROUTES ---
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', mapelRouter);
app.use('/api', kelasRouter);
app.use('/api', siswaRouter);
app.use('/api', jurnalRouter);
app.use('/api', jadwalRouter);

// Tambahkan health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
  

// error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// --- DB CONNECT ---
// Pastikan connect sekali di cold start (baik dev maupun prod)
connectDB().catch(err => {
  console.error('Mongo connect error:', err);
});

// HANYA listen saat dev (local). Di Vercel JANGAN listen.
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`App listening on port: ${port}`));
}

// Penting: default export untuk @vercel/node
export default app;



