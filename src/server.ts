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


// server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

// CORS: saat production, whitelist domain FE-mu di Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  // ganti dengan domain FE-mu di Vercel:
  'https://your-frontend.vercel.app',
  // preview vercel (*.vercel.app) optional:
  /\.vercel\.app$/ as unknown as string, // biar simple, bisa juga pakai function checker di origin
];

const corsOptions: cors.CorsOptions = {
  origin(origin, cb) {
    // no Origin (curl/postman) → allow
    if (!origin) return cb(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) // allow subdomain vercel preview
    ) {
      return cb(null, true);
    }
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', mapelRouter);
app.use('/api', kelasRouter);
app.use('/api', siswaRouter);
app.use('/api', jurnalRouter);
app.use('/api', jadwalRouter);

// **PENTING**: connect DB saat modul di-load (baik dev maupun vercel)
connectDB()
  .then(() => {
    // HANYA listen saat bukan production (local dev)
    if (process.env.NODE_ENV !== 'production') {
      app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
      });
    }
  })
  .catch((err: any) => {
    console.error(`Gagal terhubung ke database: ${err?.message || err}`);
  });

// Di Vercel kita butuh export app (tanpa listen)
export { app };
